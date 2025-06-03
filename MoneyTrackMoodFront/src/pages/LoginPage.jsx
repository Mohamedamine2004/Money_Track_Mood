import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after login
import "../LoginPage.css";

const LoginPage = () => {
  // States to store form inputs
  const [name, setName] = useState(""); // For 'name'
  const [password, setPassword] = useState(""); // For 'password'
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !password) {
      setError("Please enter both your name and password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: name, motDePasse: password })
, // match your backend fields
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token for future requests
        navigate("/DashboardPage"); // Redirect on successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      setError("Please enter both your name and password.");
    } else {
      setError("");
      // Example login logic
      console.log("Logging in with", { name, password });

      // Redirect to a different page after successful login
      navigate("/dashboard"); // Redirect to a dashboard page or another route
    }
  };
*/
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="welcome-text">
          <strong>Hi, Welcome!</strong>
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Updating name state
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Updating password state
          />

          {error && <p className="error">{error}</p>}

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="login-btn">
            Sign in
          </button>

          <p className="continue-with">or continue with</p>

          <div className="social-buttons">
            <button className="google-btn">G</button>
            <button className="github-btn">G</button>
            <button className="facebook-btn">F</button>
          </div>

          <p className="register-link">
            Don't have an account yet? <a href="/CreateAccount">Register for free</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
