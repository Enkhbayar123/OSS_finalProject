import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cookbook from "./pages/Cookbook";
import EditRecipe from "./pages/EditRecipe";
import Login from "./pages/Login";
import "./App.css";

function App() {
  // Check localStorage to see if user was previously logged in
  const [user, setUser] = useState(() => localStorage.getItem("recipeAppUser"));

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("recipeAppUser", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("recipeAppUser");
  };

  return (
    <Router>
      <div className="app-container">
        {/* IF LOGGED IN: Show Navbar and Routes */}
        {user ? (
          <>
            <nav>
              <h1>RecipeVault 🍳</h1>
              <div className="links">
                <Link to="/">Search Recipes</Link>
                <Link to="/cookbook">My Cookbook</Link>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    marginLeft: '20px', 
                    background: 'transparent', 
                    border: '1px solid #ddd', 
                    color: '#333',
                    padding: '5px 10px'
                  }}
                >
                  Logout ({user})
                </button>
              </div>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cookbook" element={<Cookbook />} />
              <Route path="/edit/:id" element={<EditRecipe />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          /* IF NOT LOGGED IN: Show Login Screen only */
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;