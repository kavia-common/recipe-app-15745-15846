import React, { useEffect, useState } from 'react';
import { MealAPI } from '../../services/api';
import { Loader } from '../../shared/components';

export default function ShoppingList() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const data = await MealAPI.getShoppingList();
      setList(data?.items || data || []);
    } catch (e) {
      setError(e.message || 'Failed to load shopping list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []); // eslint-disable-line

  const generate = async () => {
    try {
      await MealAPI.generateShoppingList({});
      await load();
    } catch (e) {
      alert(e.message || 'Failed to generate list.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <section aria-labelledby="shopping-title" style={{padding:'16px 0'}}>
      <h1 id="shopping-title">Shopping List</h1>
      <button className="btn" onClick={generate}>Generate from Meal Plan</button>
      {list.length === 0 ? <p>No items yet.</p> : (
        <ul>
          {list.map((it, idx)=>(
            <li key={idx}>{it.quantity ? `${it.quantity} ` : ''}{it.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
