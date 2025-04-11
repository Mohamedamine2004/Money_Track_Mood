import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; 

import '../styles.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <div className="stars"></div>
        <h1>Explore the app</h1>
        <p>Now your finances are in one place and always under control</p>
        <div className="buttons">
          {/* Button for Sign In */}
          <Button onClick={() => navigate('/login')} text="Sign In" variant="primary" />
          
          {/* Button for Create Account */}
          <Button onClick={() => navigate('/CreateAccount')} text="Create Account" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
