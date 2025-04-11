import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        setError("Failed to fetch expenses. Please log in again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching expenses.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired path
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>MoneyTrack Mood</h2>
        <div className="navbar-buttons">
          <button onClick={() => handleNavigation("/about-us")} className="btn">About Us</button>
          <button onClick={() => handleNavigation("/statistics")} className="btn">Statistics</button>
          <button onClick={() => handleNavigation("/settings")} className="btn">Settings</button>
        </div>
        <button onClick={handleLogout} className="btn logout-btn">Logout</button>
      </nav>

      <h3>Your Expenses</h3>
      {error && <p className="error">{error}</p>}

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Mood</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((exp, index) => (
              <tr key={index}>
                <td>{exp.date}</td>
                <td>{exp.amount} $</td>
                <td>{exp.category}</td>
                <td>{exp.mood}</td>
                <td>{exp.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
