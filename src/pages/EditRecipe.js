import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 0, notes: "" });
  const [recipeName, setRecipeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getOneFavorite(id);
        setRecipeName(res.data.title);
        setForm({ rating: res.data.rating, notes: res.data.notes });
      } catch (error) {
        console.error("Error loading recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.updateFavorite(id, form);
    navigate("/cookbook");
  };

  if (loading) return <div className="page">Loading...</div>;

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card form-card">
        <h2>Edit: <span style={{ color: 'var(--primary)' }}>{recipeName}</span></h2>
        
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Rating (1-5)</label>
            <input 
              type="number" 
              max="5" 
              min="1" 
              value={form.rating} 
              onChange={(e) => setForm({...form, rating: e.target.value})}
              className="styled-input"
            />
          </div>
          
          <div className="form-group">
            <label>Personal Notes</label>
            <textarea 
              rows="5"
              value={form.notes} 
              onChange={(e) => setForm({...form, notes: e.target.value})}
              className="styled-input"
              placeholder="What did you like? What would you change?"
            />
          </div>
          
          <div className="actions">
            <button type="button" className="secondary-btn" onClick={() => navigate("/cookbook")}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;