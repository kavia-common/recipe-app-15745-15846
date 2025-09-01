import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import './layout.css';

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      {children}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function Layout() {
  /** Shared app layout with accessible navigation and user actions. */
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-root">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="topbar" role="banner">
        <div className="container">
          <Link to="/" className="brand" aria-label="Recipe App Home">🍳 RecipeApp</Link>
          <nav className="nav" aria-label="Primary Navigation">
            <NavItem to="/recipes">Recipes</NavItem>
            <NavItem to="/collections">Collections</NavItem>
            <NavItem to="/meal-planner">Meal Planner</NavItem>
            <NavItem to="/shopping-list">Shopping List</NavItem>
            <NavItem to="/community">Community</NavItem>
          </nav>
          <div className="actions">
            {user ? (
              <>
                <NavItem to="/profile" aria-label="Profile">Hi, {user.displayName || user.email}</NavItem>
                <button className="btn btn-secondary" onClick={logout} aria-label="Logout">Logout</button>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </>
            )}
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="container" aria-live="polite">
        <Outlet key={location.pathname} />
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
          <nav aria-label="Footer">
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
