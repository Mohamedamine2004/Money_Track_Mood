import React from "react";
import "./ExpenseFormModal.css";

const ExpenseFormModal = ({ expenseForm, handleInputChange, handleSubmitExpense, handleCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{expenseForm.id ? "Edit Expense" : "Add an Expense"}</h2>
        <form onSubmit={handleSubmitExpense}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={expenseForm.date}
            onChange={handleInputChange}
            required
          />
          <label>Amount (€)</label>
          <input
            type="number"
            name="amount"
            value={expenseForm.amount}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
          <label>Category</label>
          <select
            name="category"
            value={expenseForm.category}
            onChange={handleInputChange}
          >
            <option value="TRANSPORT">Transport</option>
            <option value="LOISIRS">Leisure</option>
            <option value="SANTE">Health</option>
            <option value="RESTAURATION">Dining</option>
            <option value="AUTRE">Other</option>
          </select>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={expenseForm.description}
            onChange={handleInputChange}
          />
          <label>Mood</label>
          <select
            name="mood"
            value={expenseForm.mood}
            onChange={handleInputChange}
          >
            <option value="HEUREUX">Happy</option>
            <option value="STRESSÉ">Stressed</option>
            <option value="ENERGIQUE">Energetic</option>
            <option value="FATIGUE">Tired</option>
            <option value="AUTRE">Other</option>
          </select>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {expenseForm.id ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;