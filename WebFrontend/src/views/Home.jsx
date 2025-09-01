import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page highlighting primary actions with accessible links. */
  return (
    <section aria-labelledby="home-title" style={{ padding: '24px 0' }}>
      <h1 id="home-title">Discover, Cook, Share.</h1>
      <p className="lead">Find new recipes, organize your favorites, plan meals, and shop smarter.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Link className="btn" to="/recipes">Browse Recipes</Link>
        <Link className="btn" to="/recipes/new">Add Recipe</Link>
        <Link className="btn" to="/meal-planner">Plan Meals</Link>
        <Link className="btn" to="/community">Community</Link>
      </div>
    </section>
  );
}
