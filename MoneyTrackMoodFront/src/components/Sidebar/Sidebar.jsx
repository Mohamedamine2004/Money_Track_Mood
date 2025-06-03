import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const handleLogoutClick = () => {
    console.log("Logout button clicked");
    if (onLogout) {
      onLogout();
    } else {
      console.warn("onLogout prop is not defined");
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>MoneyTrackMood</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink
            to="/DashboardPage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">📊</span> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/statistics"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">📈</span> Statistics
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/journal"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">📅</span> Journal
          </NavLink>
        </li>
        <li className="sidebar-item logout">
          <span className="icon">🚪</span>
          <button onClick={handleLogoutClick}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;