import React from "react";
import "./SummaryCards.css";

const SummaryCards = ({ totalExpenses, numberOfExpenses }) => {
  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Expenses</h3>
        <p>Total amount spent</p>
        <div className="card-value">
          <span className="icon">📈</span>
          {totalExpenses.toFixed(2)} €
        </div>
      </div>
      <div className="card">
        <h3>Number of Expenses</h3>
        <p>Total transactions</p>
        <div className="card-value">
          <span className="icon">📊</span>
          {numberOfExpenses}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;