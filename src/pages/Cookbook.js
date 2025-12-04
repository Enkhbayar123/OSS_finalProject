import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

function Cookbook() {
  const [myRecipes, setMyRecipes] = useState([]);

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
        loadData(); // Refresh list
    }
  };

  return (
    <div className="page">
      <h2>My Cookbook ({myRecipes.length})</h2>
      <div className="grid">
        {myRecipes.map((item) => (
          <div key={item.id} className="card saved">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Rating: {item.rating} / 5</p>
            <p>Note: {item.notes}</p>
            
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
    </div>
  );
}

export default Cookbook;