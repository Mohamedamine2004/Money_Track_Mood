import React from "react";
import Filters from "../Filters/Filters";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import "./ExpenseSection.css";

const ExpenseSection = ({
  filteredExpenses,
  categoryTranslations,
  categoryFilter,
  setCategoryFilter,
  moodFilter,
  setMoodFilter,
  setShowForm,
  setExpenseForm,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="expense-section">
      <h2>Expenses</h2>
      <div className="table-header">
        <button
          className="new-expense-btn"
          onClick={() => {
            setExpenseForm({
              id: null,
              date: "",
              amount: 0,
              category: "TRANSPORT",
              description: "",
              mood: "HEUREUX",
            });
            setShowForm(true);
          }}
        >
          New Expense
        </button>
        <Filters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          moodFilter={moodFilter}
          setMoodFilter={setMoodFilter}
        />
      </div>
      {filteredExpenses.length === 0 ? (
        <div className="no-data">
          <span className="chart-placeholder">📉</span>
          <p>No expenses to display</p>
        </div>
      ) : (
        <ExpenseTable
          expenses={filteredExpenses}
          categoryTranslations={categoryTranslations}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ExpenseSection;