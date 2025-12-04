import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cookbook from "./pages/Cookbook";
import EditRecipe from "./pages/EditRecipe";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <h1>RecipeVault 🍳</h1>
          <div className="links">
            <Link to="/">Search Recipes</Link>
            <Link to="/cookbook">My Cookbook</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;