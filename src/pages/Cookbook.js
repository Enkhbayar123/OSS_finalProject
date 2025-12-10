import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

function Cookbook() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.getFavorites();
    setMyRecipes(res.data);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this recipe?")) {
        await api.deleteFavorite(id);
        loadData();
    }
  };

  return (
    <div className="page">
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        My Cookbook ({myRecipes.length})
      </h2>
      
      {myRecipes.length === 0 && (
        <p style={{ textAlign: 'center', color: '#777' }}>
          No recipes saved yet. Go search for some!
        </p>
      )}

      <div className="grid">
        {myRecipes.map((item) => (
          <div key={item.id} className="card saved">
            <img 
              src={item.image} 
              alt={item.title} 
              onClick={() => setSelectedMeal(item)}
              title="Click to view details"
            />
            <h3>{item.title}</h3>
            <div style={{ padding: '0 15px 10px', color: '#666' }}>
                Rating: {item.rating} / 5 ⭐
            </div>
            
            <div className="actions" style={{ padding: '15px', display: 'flex', gap: '10px' }}>
              <Link to={`/edit/${item.id}`} style={{ flex: 1 }}>
                <button style={{ width: '100%' }}>Edit</button>
              </Link>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="delete-btn" 
                style={{ flex: 1 }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="modal-overlay" onClick={() => setSelectedMeal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMeal(null)}>&times;</button>
            <h2 style={{marginTop: 0}}>{selectedMeal.title}</h2>
            <img 
              src={selectedMeal.image} 
              alt={selectedMeal.title} 
              className="modal-image"
            />
            
            <div className="info-section">
              <p><strong>Category:</strong> {selectedMeal.category || "General"}</p>
              <p><strong>Cuisine:</strong> {selectedMeal.area || "Unknown"}</p>
              <p><strong>Rating:</strong> {selectedMeal.rating} / 5 ⭐</p>
              {selectedMeal.notes && (
                <p><strong>My Notes:</strong> <em>"{selectedMeal.notes}"</em></p>
              )}
            </div>

            <h3>Instructions</h3>
            <p className="instructions">
              {selectedMeal.instructions || "No instructions available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cookbook;