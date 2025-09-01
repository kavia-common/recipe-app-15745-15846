import React, { useEffect, useState } from 'react';
import './App.css';
import './shared/layout.css';
import './shared/components.css';
import AppRouter from './routes/AppRouter';

// PUBLIC_INTERFACE
function App() {
  /** App manages theme and renders the router. */
  const [theme, setTheme] = useState(() => localStorage.getItem('ui:theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ui:theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <AppRouter />
    </div>
  );
}

export default App;
