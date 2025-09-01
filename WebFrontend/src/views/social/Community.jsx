import React, { useEffect, useState } from 'react';
import { SocialAPI } from '../../services/api';
import { Loader } from '../../shared/components';

export default function Community() {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await SocialAPI.feed();
        setFeed(data?.items || data || []);
      } catch (e) {
        setError(e.message || 'Failed to load feed.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <section aria-labelledby="community-title" style={{padding:'16px 0'}}>
      <h1 id="community-title">Community</h1>
      <ul>
        {feed.map((item)=>(
          <li key={item.id}>
            <strong>{item.author?.displayName || 'User'}</strong>: {item.type} — {item.title || item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
