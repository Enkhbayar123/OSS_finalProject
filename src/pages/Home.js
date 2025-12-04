import React, { useState, useEffect } from "react";
import { api } from "../api";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMeal, setSelectedMeal] = useState(null);

  // 1. Defined handleSearch BEFORE useEffect to ensure it exists
  const handleSearch = async () => {
    if (filter !== "All") {
        const res = await api.filterByCategory(filter);
        setRecipes(res.data.meals || []);
    } else {
        const res = await api.searchRecipes(search);
        setRecipes(res.data.meals || []);
    }
  };

  useEffect(() => {
    handleSearch();
    // 2. Added this comment to disable the warning. 
    // This keeps the "run only on mount" behavior you want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCookbook = async (meal) => {
    const newRecipe = {
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory || "General",
      area: meal.strArea || "Unknown",
      instructions: meal.strInstructions || "No instructions available", 
      rating: 0,
      notes: "",
    };
    
    await api.addFavorite(newRecipe);
    alert("Added to Cookbook!");
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="page">
      <div className="controls">
        <input 
          placeholder="Search (e.g., Pasta)..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Breakfast">Breakfast</option>
        </select>
        <button onClick={handleSearch}>Find</button>
      </div>

      <div className="grid">
        {recipes.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              onClick={() => setSelectedMeal(meal)}
              style={{ cursor: "pointer" }}
              title="Click to view details"
            />
            <h3>{meal.strMeal}</h3>
            <button onClick={() => addToCookbook(meal)}>
              Save to Cookbook
            </button>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>&times;</button>
            <h2 style={{marginTop: 0}}>{selectedMeal.strMeal}</h2>
            <img 
              src={selectedMeal.strMealThumb} 
              alt={selectedMeal.strMeal} 
              style={styles.modalImage}
            />
            
            <div style={styles.infoSection}>
              <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
              <p><strong>Cuisine:</strong> {selectedMeal.strArea}</p>
            </div>

            <h3>Instructions:</h3>
            <p style={styles.instructions}>
              {selectedMeal.strInstructions || "No instructions available."}
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
    backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "5px",
    marginBottom: "15px", borderLeft: "4px solid #007bff"
  },
  instructions: {
    whiteSpace: "pre-wrap", lineHeight: "1.5", color: "#333"
  }
};

export default Home;