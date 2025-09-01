import React, { useEffect, useState } from 'react';
import { RecipesAPI } from '../../services/api';
import { Loader } from '../../shared/components';

export default function Collections() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await RecipesAPI.collections();
        setCollections(data?.items || data || []);
      } catch (e) {
        setError(e.message || 'Failed to load collections.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <section aria-labelledby="collections-title" style={{padding:'16px 0'}}>
      <h1 id="collections-title">Your Collections</h1>
      {(collections.length === 0) ? <p>No collections yet.</p> : (
        <ul>
          {collections.map((c)=>(
            <li key={c.id}><strong>{c.name}</strong> — {c.items?.length || 0} items</li>
          ))}
        </ul>
      )}
    </section>
  );
}
