import React, { useEffect, useState } from 'react';
import { TextInput, TextArea } from '../../shared/components';
import '../../shared/components.css';
import { RecipesAPI } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeEditor({ mode }) {
  const isEdit = mode === 'edit';
  const { id } = useParams();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    readyInMinutes: 30,
    cuisine: '',
    ingredients: [''],
    instructions: [''],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const load = async () => {
        try {
          const data = await RecipesAPI.get(id);
          setForm({
            title: data.title || '',
            description: data.description || '',
            imageUrl: data.imageUrl || '',
            readyInMinutes: data.readyInMinutes || 30,
            cuisine: data.cuisine || '',
            ingredients: data.ingredients?.length ? data.ingredients : [''],
            instructions: data.instructions?.length ? data.instructions : [''],
          });
        } catch (e) { setError(e.message || 'Failed to load recipe'); }
      };
      load();
    }
  }, [isEdit, id]);

  const updateArray = (key, idx, value) => {
    setForm(f => {
      const arr = [...f[key]];
      arr[idx] = value;
      return { ...f, [key]: arr };
    });
  };
  const addArrayItem = (key) => setForm(f => ({ ...f, [key]: [...f[key], ''] }));
  const removeArrayItem = (key, idx) => setForm(f => ({ ...f, [key]: f[key].filter((_,i)=>i!==idx) }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const payload = { ...form, ingredients: form.ingredients.filter(Boolean), instructions: form.instructions.filter(Boolean) };
    try {
      if (isEdit) {
        await RecipesAPI.update(id, payload);
        navigate(`/recipes/${id}`);
      } else {
        const res = await RecipesAPI.create(payload);
        navigate(`/recipes/${res.id}`);
      }
    } catch (e1) {
      setError(e1.message || 'Failed to save recipe');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} aria-labelledby="editor-title" style={{maxWidth:800, margin:'24px auto'}}>
      <h1 id="editor-title">{isEdit ? 'Edit Recipe' : 'Create Recipe'}</h1>
      {error && <div className="error" role="alert">{error}</div>}
      <TextInput label="Title" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} required />
      <TextArea label="Description" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
      <TextInput label="Image URL" value={form.imageUrl} onChange={e=>setForm(f=>({...f, imageUrl:e.target.value}))} />
      <TextInput label="Ready in minutes" type="number" min="1" value={form.readyInMinutes} onChange={e=>setForm(f=>({...f, readyInMinutes:Number(e.target.value)}))} />
      <TextInput label="Cuisine" value={form.cuisine} onChange={e=>setForm(f=>({...f, cuisine:e.target.value}))} />
      <fieldset>
        <legend>Ingredients</legend>
        {form.ingredients.map((ing, idx)=>(
          <div key={idx} style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
            <TextInput label={`Ingredient ${idx+1}`} value={ing} onChange={e=>updateArray('ingredients', idx, e.target.value)} />
            <button className="btn" type="button" onClick={()=>removeArrayItem('ingredients', idx)} aria-label={`Remove ingredient ${idx+1}`}>Remove</button>
          </div>
        ))}
        <button className="btn" type="button" onClick={()=>addArrayItem('ingredients')}>Add Ingredient</button>
      </fieldset>
      <fieldset>
        <legend>Instructions</legend>
        {form.instructions.map((step, idx)=>(
          <div key={idx} style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
            <TextInput label={`Step ${idx+1}`} value={step} onChange={e=>updateArray('instructions', idx, e.target.value)} />
            <button className="btn" type="button" onClick={()=>removeArrayItem('instructions', idx)} aria-label={`Remove step ${idx+1}`}>Remove</button>
          </div>
        ))}
        <button className="btn" type="button" onClick={()=>addArrayItem('instructions')}>Add Step</button>
      </fieldset>
      <div style={{marginTop:12}}>
        <button className="btn" disabled={busy} type="submit" aria-busy={busy}>{busy ? 'Saving...' : 'Save Recipe'}</button>
      </div>
    </form>
  );
}
