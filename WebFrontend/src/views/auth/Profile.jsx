import React, { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { TextInput, TextArea } from '../../shared/components';
import '../../shared/components.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
  });
  const [message, setMessage] = useState('');

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setMessage('');
    try {
      await updateProfile(form);
      setMessage('Profile updated successfully.');
    } catch (e1) {
      setMessage(e1.message || 'Failed to update profile.');
    } finally {
      setBusy(false);
    }
  };

  if (!user) return <p>Please login to manage your profile.</p>;

  return (
    <form onSubmit={save} aria-labelledby="profile-title" style={{maxWidth:640, margin:'24px auto'}}>
      <h1 id="profile-title">Your Profile</h1>
      {message && <div role="status">{message}</div>}
      <TextInput label="Display Name" value={form.displayName} onChange={e=>setForm(f=>({...f, displayName: e.target.value}))} />
      <TextArea label="Bio" value={form.bio} onChange={e=>setForm(f=>({...f, bio: e.target.value}))} />
      <button disabled={busy} className="btn" type="submit" aria-busy={busy}>{busy ? 'Saving...' : 'Save'}</button>
    </form>
  );
}
