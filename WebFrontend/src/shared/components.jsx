import React from 'react';
import clsx from 'clsx';
import './components.css';

// PUBLIC_INTERFACE
export function TextInput({ label, id, error, helper, className, ...props }) {
  /** Accessible text input with label and error helper. */
  const inputId = id || props.name;
  const errId = error ? `${inputId}-error` : undefined;
  const helpId = helper ? `${inputId}-help` : undefined;
  return (
    <div className={clsx('field', className)}>
      {label && <label htmlFor={inputId} className="label">{label}</label>}
      <input id={inputId} aria-describedby={clsx(errId, helpId)} aria-invalid={!!error} className={clsx('input', { 'input-error': !!error })} {...props} />
      {helper && <div id={helpId} className="helper">{helper}</div>}
      {error && <div id={errId} className="error" role="alert">{error}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function TextArea({ label, id, error, helper, className, ...props }) {
  const inputId = id || props.name;
  const errId = error ? `${inputId}-error` : undefined;
  const helpId = helper ? `${inputId}-help` : undefined;
  return (
    <div className={clsx('field', className)}>
      {label && <label htmlFor={inputId} className="label">{label}</label>}
      <textarea id={inputId} aria-describedby={clsx(errId, helpId)} aria-invalid={!!error} className={clsx('textarea', { 'input-error': !!error })} {...props} />
      {helper && <div id={helpId} className="helper">{helper}</div>}
      {error && <div id={errId} className="error" role="alert">{error}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, id, error, helper, className, children, ...props }) {
  const inputId = id || props.name;
  const errId = error ? `${inputId}-error` : undefined;
  const helpId = helper ? `${inputId}-help` : undefined;
  return (
    <div className={clsx('field', className)}>
      {label && <label htmlFor={inputId} className="label">{label}</label>}
      <select id={inputId} aria-describedby={clsx(errId, helpId)} aria-invalid={!!error} className={clsx('select', { 'input-error': !!error })} {...props}>
        {children}
      </select>
      {helper && <div id={helpId} className="helper">{helper}</div>}
      {error && <div id={errId} className="error" role="alert">{error}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Loader({ label = 'Loading...' }) {
  return (
    <div role="status" aria-live="polite" className="loader">
      <span className="spinner" aria-hidden="true" /> {label}
    </div>
  );
}

// PUBLIC_INTERFACE
export function RecipeCard({ recipe, onClick }) {
  return (
    <div
      className="card"
      role="article"
      aria-label={`Recipe ${recipe.title}`}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
    >
      <div className="card-media" aria-hidden="true">
        {recipe.imageUrl ? <img src={recipe.imageUrl} alt="" /> : <div className="placeholder">🍽️</div>}
      </div>
      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-sub">{recipe.cuisine || 'General'} • {Math.round(recipe.readyInMinutes || 30)} min</p>
        <p className="card-desc">{recipe.description || 'Delicious recipe'}</p>
      </div>
    </div>
  );
}
