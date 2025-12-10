import React, { useState, useEffect } from "react";
import { api } from "../api";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMeal, setSelectedMeal] = useState(null);

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

  return (
    <div className="page">
      <div className="controls">
        <input 
          placeholder="Search recipes..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
        </select>
        <button onClick={handleSearch}>Find Recipes</button>
      </div>

      <div className="grid">
        {recipes.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              onClick={() => setSelectedMeal(meal)}
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
        <div className="modal-overlay" onClick={() => setSelectedMeal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMeal(null)}>&times;</button>
            <h2 style={{marginTop: 0}}>{selectedMeal.strMeal}</h2>
            <img 
              src={selectedMeal.strMealThumb} 
              alt={selectedMeal.strMeal} 
              className="modal-image"
            />
            
            <div className="info-section">
              <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
              <p><strong>Cuisine:</strong> {selectedMeal.strArea}</p>
            </div>

            <h3>Instructions</h3>
            <p className="instructions">
              {selectedMeal.strInstructions || "No instructions available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;