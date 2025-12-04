import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 0, notes: "" });
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getOneFavorite(id);
      setRecipeName(res.data.title);
      setForm({ rating: res.data.rating, notes: res.data.notes });
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.updateFavorite(id, form);
    navigate("/cookbook");
  };

  return (
    <div className="page form-page">
      <h2>Edit: {recipeName}</h2>
      <form onSubmit={handleUpdate}>
        <label>Rating (1-5):</label>
        <input 
          type="number" max="5" min="1" 
          value={form.rating} 
          onChange={(e) => setForm({...form, rating: e.target.value})}
        />
        
        <label>Personal Notes:</label>
        <textarea 
          value={form.notes} 
          onChange={(e) => setForm({...form, notes: e.target.value})}
        />
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecipe;