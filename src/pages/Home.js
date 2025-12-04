import React, { useState, useEffect } from "react";
import { api } from "../api";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Initial load
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if (filter !== "All") {
        // Filter logic
        const res = await api.filterByCategory(filter);
        setRecipes(res.data.meals || []);
    } else {
        // Search logic
        const res = await api.searchRecipes(search);
        setRecipes(res.data.meals || []);
    }
  };

  const addToCookbook = async (meal) => {
    const newRecipe = {
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory || "General", // Open API category
      instructions: meal.strInstructions?.slice(0, 100) || "No instructions",
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
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <button onClick={() => addToCookbook(meal)}>
              Save to Cookbook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;