import React from "react";
import "./ExpenseTable.css";

const ExpenseTable = ({ expenses, categoryTranslations, onEdit, onDelete }) => {
  
  const moodEmojis = {
    HEUREUX: "😊",
    STRESSÉ: "😓",
    ENERGIQUE: "⚡",
    FATIGUE: "😴",
    AUTRE: "❓",
  };

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount (€)</th>
          <th>Category</th>
          <th>Description</th>
          <th>Mood</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.amount.toFixed(2)}</td>
            <td>{categoryTranslations[expense.category] || expense.category}</td>
            <td>{expense.description || "-"}</td>
            <td>{moodEmojis[expense.mood] || "❓"}</td>
            <td>
              <button
                className="action-btn modify"
                onClick={() => onEdit(expense)}
              >
                Modify
              </button>
              <button
                className="action-btn delete"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;