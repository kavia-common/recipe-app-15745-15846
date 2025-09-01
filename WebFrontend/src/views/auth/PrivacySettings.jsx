import React, { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { Select } from '../../shared/components';
import '../../shared/components.css';

export default function PrivacySettings() {
  const { user, updatePrivacy } = useAuth();
  const [busy, setBusy] = useState(false);
  const [visibility, setVisibility] = useState(user?.privacy?.profileVisibility || 'public');
  const [dm, setDm] = useState(user?.privacy?.allowDM || 'followers');
  const [msg, setMsg] = useState('');

  if (!user) return <p>Please login to manage privacy.</p>;

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg('');
    try {
      await updatePrivacy({ profileVisibility: visibility, allowDM: dm });
      setMsg('Privacy settings updated.');
    } catch (e1) {
      setMsg(e1.message || 'Failed to update privacy.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} aria-labelledby="privacy-title" style={{maxWidth:560, margin:'24px auto'}}>
      <h1 id="privacy-title">Privacy</h1>
      {msg && <div role="status">{msg}</div>}
      <Select label="Profile visibility" value={visibility} onChange={e=>setVisibility(e.target.value)}>
        <option value="public">Public</option>
        <option value="followers">Followers</option>
        <option value="private">Only Me</option>
      </Select>
      <Select label="Direct messages" value={dm} onChange={e=>setDm(e.target.value)}>
        <option value="everyone">Everyone</option>
        <option value="followers">Followers Only</option>
        <option value="none">Disabled</option>
      </Select>
      <button disabled={busy} className="btn" type="submit" aria-busy={busy}>{busy ? 'Saving...' : 'Save'}</button>
    </form>
  );
}
