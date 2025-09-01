import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const err = useRouteError?.() || {};
  return (
    <section style={{padding:'24px 0'}}>
      <h1>Page not found</h1>
      {err?.status && <p>Status: {err.status}</p>}
      <p>The page you requested does not exist.</p>
      <Link className="btn" to="/">Go Home</Link>
    </section>
  );
}
