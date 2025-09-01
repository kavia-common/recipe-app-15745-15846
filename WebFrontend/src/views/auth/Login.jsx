import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../state/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../shared/components';
import '../../shared/components.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (values) => {
    setBusy(true); setError(null);
    try {
      await login(values.email, values.password);
      navigate('/recipes');
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="login-title" style={{maxWidth:480, margin:'24px auto'}}>
      <h1 id="login-title">Login</h1>
      {error && <div role="alert" className="error">{error}</div>}
      <TextInput label="Email" type="email" required {...register('email')} />
      <TextInput label="Password" type="password" required {...register('password')} />
      <div style={{display:'flex', gap:8, alignItems:'center', marginTop:8}}>
        <button disabled={busy} className="btn" type="submit" aria-busy={busy}>{busy ? 'Signing in...' : 'Sign In'}</button>
      </div>
    </form>
  );
}
