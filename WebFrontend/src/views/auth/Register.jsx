import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../state/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../shared/components';
import '../../shared/components.css';

export default function Register() {
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (values) => {
    setBusy(true); setError(null);
    try {
      await doRegister(values);
      navigate('/recipes');
    } catch (e) {
      setError(e.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="register-title" style={{maxWidth:520, margin:'24px auto'}}>
      <h1 id="register-title">Create your account</h1>
      {error && <div role="alert" className="error">{error}</div>}
      <TextInput label="Display Name" {...register('displayName')} />
      <TextInput label="Email" type="email" required {...register('email')} />
      <TextInput label="Password" type="password" required {...register('password')} />
      <div style={{display:'flex', gap:8, alignItems:'center', marginTop:8}}>
        <button disabled={busy} className="btn" type="submit" aria-busy={busy}>{busy ? 'Creating...' : 'Create Account'}</button>
      </div>
    </form>
  );
}
