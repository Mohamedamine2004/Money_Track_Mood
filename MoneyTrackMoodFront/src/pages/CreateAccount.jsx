import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after submission
import axios from 'axios';
import "../LoginPage.css";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else {
      setError('');
      // Example validation for email
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
      // Example of password length check
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    const userData = {
      email: email,
      motDePasse: password,
      prenom: lastName,
      nom: firstName,
    };

    // Make the POST request to the backend
    axios
      .post('http://localhost:8081/register', userData)
      .then((response) => {
      
          console.log('Account created:', response.data);
          setSuccess(true); // Form successfully submitted
          setTimeout(() => navigate('/Login'), 2000); // Redirect to login
      })
      .catch((error) => {
        // Handle network or other errors
        console.error('Error Details:', error.response || error);
        // Display a more specific message based on the error type
        if (error.response) {
          setError(error.response.data.message || 'Something went wrong. Please try again.');
        } else if (error.request) {
          setError('No response from the server. Please try again later.');
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="welcome-text">
          <strong>Hi, Welcome!</strong>
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Account successfully created! Redirecting...</p>}

          <button type="submit" className="login-btn">
            Sign Up
          </button>

          <p className="continue-with">or continue with</p>

          <div className="social-buttons">
            <button className="google-btn">G</button>
            <button className="github-btn">G</button>
            <button className="facebook-btn">F</button>
          </div>

          <p className="register-link">
            Already have an account? <a href="/Login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
