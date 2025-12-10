import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation: Just check if fields are filled
    if (!formData.username || !formData.password) {
      setError("Please fill in both username and password.");
      return;
    }

    if (isSignup) {
      // Simulation: "Sign Up" successful, switch to Login view
      alert("Account created successfully! Please log in.");
      setIsSignup(false);
    } else {
      // Simulation: "Log In" successful, enter the app
      onLogin(formData.username);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card form-card" style={{ maxWidth: '400px', marginTop: 0 }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              name="username" 
              type="text" 
              className="styled-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              className="styled-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span 
            onClick={() => { setIsSignup(!isSignup); setError(""); }}
            style={{ 
              color: 'var(--primary)', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              marginLeft: '5px' 
            }}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;