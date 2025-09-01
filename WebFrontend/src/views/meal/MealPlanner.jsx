import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MealAPI } from '../../services/api';
import { Loader } from '../../shared/components';

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function MealPlanner() {
  const [weekStart, setWeekStart] = useState(dayjs().startOf('week').add(1, 'day')); // Monday
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const rangeParam = { start: weekStart.format('YYYY-MM-DD'), end: weekStart.add(6,'day').format('YYYY-MM-DD') };

  useEffect(()=>{
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await MealAPI.getPlan(rangeParam);
        setPlan(data || {});
      } catch (e) {
        setError(e.message || 'Failed to load meal plan.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [weekStart]); // eslint-disable-line

  const setEntry = (dayIndex, mealType, value) => {
    setPlan(p => {
      const d = dayjs(weekStart).add(dayIndex, 'day').format('YYYY-MM-DD');
      const cur = p[d] || {};
      return { ...p, [d]: { ...cur, [mealType]: value } };
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      await MealAPI.savePlan({ range: rangeParam, plan });
      alert('Meal plan saved');
    } catch (e) {
      alert(e.message || 'Failed to save plan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <section aria-labelledby="planner-title" style={{padding:'16px 0'}}>
      <h1 id="planner-title">Meal Planner</h1>
      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
        <button className="btn" onClick={()=>setWeekStart(d=>d.add(-7,'day'))} aria-label="Previous week">← Previous</button>
        <strong>Week of {weekStart.format('MMM D')}</strong>
        <button className="btn" onClick={()=>setWeekStart(d=>d.add(7,'day'))} aria-label="Next week">Next →</button>
        <button className="btn" onClick={save} disabled={saving} aria-busy={saving}>Save</button>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:8}}>
        {days.map((d, idx)=> {
          const dateKey = dayjs(weekStart).add(idx, 'day').format('YYYY-MM-DD');
          const entry = plan[dateKey] || {};
          return (
            <div key={d} style={{border:'1px solid var(--border, #e5e7eb)', padding:8, borderRadius:8}}>
              <strong>{d}</strong>
              <div>
                <label>Breakfast</label>
                <input value={entry.breakfast || ''} onChange={e=>setEntry(idx,'breakfast', e.target.value)} aria-label={`${d} breakfast`} />
              </div>
              <div>
                <label>Lunch</label>
                <input value={entry.lunch || ''} onChange={e=>setEntry(idx,'lunch', e.target.value)} aria-label={`${d} lunch`} />
              </div>
              <div>
                <label>Dinner</label>
                <input value={entry.dinner || ''} onChange={e=>setEntry(idx,'dinner', e.target.value)} aria-label={`${d} dinner`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
