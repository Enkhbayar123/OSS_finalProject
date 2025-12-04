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

  const closeModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="page">
      <h2>My Cookbook ({myRecipes.length})</h2>
      <div className="grid">
        {myRecipes.map((item) => (
          <div key={item.id} className="card saved">
            <img 
              src={item.image} 
              alt={item.title} 
              onClick={() => setSelectedMeal(item)}
              style={{ cursor: "pointer" }}
              title="Click to view details"
            />
            <h3>{item.title}</h3>
            <p>Rating: {item.rating} / 5</p>
            
            <div className="actions">
              <Link to={`/edit/${item.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(item.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>&times;</button>
            <h2 style={{marginTop: 0}}>{selectedMeal.title}</h2>
            <img 
              src={selectedMeal.image} 
              alt={selectedMeal.title} 
              style={styles.modalImage}
            />
            
            <div style={styles.infoSection}>
              <p><strong>Category:</strong> {selectedMeal.category || "General"}</p>
              <p><strong>Cuisine:</strong> {selectedMeal.area || "Unknown"}</p>
              <p><strong>Rating:</strong> {selectedMeal.rating} / 5 ⭐</p>
              {selectedMeal.notes && (
                <p><strong>My Notes:</strong> <em>"{selectedMeal.notes}"</em></p>
              )}
            </div>

            <h3>Instructions:</h3>
            <p style={styles.instructions}>
              {selectedMeal.instructions || "No instructions available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "8px",
    maxWidth: "600px", width: "90%", maxHeight: "80vh",
    overflowY: "auto", position: "relative", textAlign: "left",
  },
  closeBtn: {
    position: "absolute", top: "10px", right: "10px",
    background: "#ff4444", color: "white", border: "none",
    borderRadius: "50%", width: "30px", height: "30px",
    cursor: "pointer", fontSize: "16px", lineHeight: "30px", padding: 0,
  },
  modalImage: {
    width: "100%", height: "200px", objectFit: "cover",
    borderRadius: "8px", marginBottom: "15px"
  },
  infoSection: {
    backgroundColor: "#fff8dc", 
    padding: "10px", borderRadius: "5px",
    marginBottom: "15px", borderLeft: "4px solid #ffc107"
  },
  instructions: {
    whiteSpace: "pre-wrap", lineHeight: "1.5", color: "#333"
  }
};

export default Cookbook;