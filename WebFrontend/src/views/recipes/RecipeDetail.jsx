import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipesAPI } from '../../services/api';
import { Loader, TextArea } from '../../shared/components';
import '../../shared/components.css';
import { useAuth } from '../../state/AuthContext';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState('');
  const [rateBusy, setRateBusy] = useState(false);
  const [commentBusy, setCommentBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await RecipesAPI.get(id);
        setRecipe(data);
      } catch (e) {
        setError(e.message || 'Failed to load recipe.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const rate = async (score) => {
    setRateBusy(true);
    try {
      await RecipesAPI.rate(id, score);
      const updated = await RecipesAPI.get(id);
      setRecipe(updated);
    } catch (e) {
      alert(e.message || 'Failed to rate');
    } finally {
      setRateBusy(false);
    }
  };

  const sendComment = async () => {
    setCommentBusy(true);
    try {
      await RecipesAPI.comment(id, comment);
      const updated = await RecipesAPI.get(id);
      setRecipe(updated);
      setComment('');
    } catch (e) {
      alert(e.message || 'Failed to comment');
    } finally {
      setCommentBusy(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error" role="alert">{error}</div>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <article aria-labelledby="recipe-title" style={{padding:'16px 0'}}>
      <button className="btn" onClick={()=>navigate(-1)} aria-label="Go back">← Back</button>
      <h1 id="recipe-title">{recipe.title}</h1>
      <p>{recipe.description}</p>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt="" style={{maxWidth:'100%', borderRadius:12}} />}
      <h2>Ingredients</h2>
      <ul>
        {(recipe.ingredients || []).map((it, idx)=>(
          <li key={idx}>{it}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {(recipe.instructions || []).map((it, idx)=>(
          <li key={idx}>{it}</li>
        ))}
      </ol>
      <section aria-labelledby="ratings-title" style={{marginTop:16}}>
        <h2 id="ratings-title">Ratings</h2>
        <p>Average: {recipe.averageRating?.toFixed?.(1) || recipe.averageRating || 'N/A'}</p>
        <div style={{display:'flex', gap:8}}>
          {[1,2,3,4,5].map(s=>(
            <button key={s} disabled={!user || rateBusy} className="btn" onClick={()=>rate(s)} aria-label={`Rate ${s} star${s>1?'s':''}`}>{'⭐'.repeat(s)}</button>
          ))}
        </div>
      </section>
      <section aria-labelledby="comments-title" style={{marginTop:16}}>
        <h2 id="comments-title">Comments</h2>
        {(recipe.comments || []).length === 0 && <p>No comments yet.</p>}
        <ul>
          {(recipe.comments || []).map((c, idx)=>(
            <li key={idx}><strong>{c.author?.displayName || 'User'}:</strong> {c.text}</li>
          ))}
        </ul>
        <div style={{marginTop:8}}>
          <TextArea label="Add a comment" value={comment} onChange={e=>setComment(e.target.value)} />
          <button disabled={!user || commentBusy || !comment.trim()} className="btn" onClick={sendComment} aria-busy={commentBusy}>Post Comment</button>
        </div>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn" onClick={()=>navigate(`/recipes/${id}/edit`)}>Edit Recipe</button>
      </div>
    </article>
  );
}
