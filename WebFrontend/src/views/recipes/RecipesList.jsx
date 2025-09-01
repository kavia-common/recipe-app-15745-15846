import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RecipesAPI } from '../../services/api';
import { Loader, TextInput, Select, RecipeCard } from '../../shared/components';
import '../../shared/components.css';

export default function RecipesList() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState(params.get('q') || '');
  const [cuisine, setCuisine] = useState(params.get('cuisine') || '');
  const [diet, setDiet] = useState(params.get('diet') || '');
  const [error, setError] = useState(null);

  const query = useMemo(() => ({
    q: q || undefined,
    cuisine: cuisine || undefined,
    diet: diet || undefined,
  }), [q, cuisine, diet]);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await RecipesAPI.search(query);
        setRecipes(data?.items || data || []);
      } catch (e) {
        setError(e.message || 'Failed to load recipes.');
      } finally {
        setLoading(false);
      }
    };
    load();
    // update URL
    const newParams = new URLSearchParams();
    Object.entries(query).forEach(([k,v]) => v && newParams.set(k, v));
    setParams(newParams, { replace: true });
  }, [query, setParams]);

  return (
    <section aria-labelledby="recipes-title" style={{padding:'16px 0'}}>
      <h1 id="recipes-title">Recipes</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, margin:'12px 0'}}>
        <TextInput placeholder="Search recipes..." value={q} onChange={(e)=>setQ(e.target.value)} aria-label="Search recipes" />
        <Select value={cuisine} onChange={e=>setCuisine(e.target.value)} aria-label="Filter by cuisine">
          <option value="">All cuisines</option>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Mediterranean</option>
        </Select>
        <Select value={diet} onChange={e=>setDiet(e.target.value)} aria-label="Filter by diet">
          <option value="">All diets</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten Free</option>
          <option>Keto</option>
        </Select>
      </div>
      {loading && <Loader />}
      {error && <div className="error" role="alert">{error}</div>}
      {!loading && !error && (
        <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))'}}>
          {recipes.map((r)=>(
            <RecipeCard key={r.id} recipe={r} onClick={()=>navigate(`/recipes/${r.id}`)} />
          ))}
        </div>
      )}
    </section>
  );
}
