import React from "react";
import "./Filters.css";

const Filters = ({ categoryFilter, setCategoryFilter, moodFilter, setMoodFilter }) => {
  return (
    <div className="filters">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="TRANSPORT">Transport</option>
        <option value="LOISIRS">Leisure</option>
        <option value="SANTE">Health</option>
        <option value="RESTAURATION">Dining</option>
        <option value="AUTRE">Other</option>
      </select>
      <select
        value={moodFilter}
        onChange={(e) => setMoodFilter(e.target.value)}
      >
        <option value="">All Moods</option>
        <option value="HEUREUX">Happy</option>
        <option value="STRESSÉ">Stressed</option>
        <option value="ENERGIQUE">Energetic</option>
        <option value="FATIGUE">Tired</option>
        <option value="AUTRE">Other</option>
      </select>
    </div>
  );
};

export default Filters;