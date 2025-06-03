import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale, BarElement } from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import "./StatisticsPage.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale, BarElement);

const StatisticsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryTranslations = {
    TRANSPORT: "Transport",
    LOISIRS: "Leisure",
    SANTE: "Health",
    RESTAURATION: "Dining",
    AUTRE: "Other",
  };

  const moodEmojis = {
    HEUREUX: "😊",
    STRESSÉ: "😓",
    ENERGIQUE: "⚡",
    FATIGUE: "😴",
    AUTRE: "❓",
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8081/depense/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const normalizedData = data.map((expense) => ({
            ...expense,
            amount: expense.montant,
            category: expense.categorie,
            mood: expense.humeur,
            date: new Date(expense.date),
          }));
          setExpenses(normalizedData);
        } else {
          console.log("Failed to fetch expenses, redirecting to login");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  const totalExpenses = expenses.reduce((sum, expense) => {
    const amount = Number(expense.amount);
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  const numberOfExpenses = expenses.length;

  const expensesByCategory = Object.keys(categoryTranslations).reduce(
    (acc, category) => {
      const total = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + Number(expense.amount), 0);
      acc[category] = total;
      return acc;
    },
    {}
  );

  const expensesByMood = Object.keys(moodEmojis).reduce((acc, mood) => {
    const total = expenses
      .filter((expense) => expense.mood === mood)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    acc[mood] = total;
    return acc;
  }, {});

  // Prepare data for Donut Chart (Expense Distribution)
  const donutData = {
    labels: Object.keys(expensesByCategory).map(
      (category) => categoryTranslations[category] || category
    ),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: ["#4a998f", "#72b3ab", "#9bcdc7", "#c4e7e3"], // Muted teal palette
        hoverBackgroundColor: ["#3d7f76", "#619a93", "#84b4af", "#add0cc"],
      },
    ],
  };

  // Prepare data for Line Chart (Monthly Expense Trend)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyExpenses = months.map((month, index) => {
    return expenses
      .filter((expense) => expense.date.getMonth() === index)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  });

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: monthlyExpenses,
        borderColor: "#4a998f", // Match the muted teal palette
        backgroundColor: "#4a998f",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const handleLogout = () => {
    console.log("handleLogout called");
    try {
      localStorage.removeItem("token");
      console.log("Token removed from localStorage");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="statistics-wrapper">
      <Sidebar onLogout={handleLogout} />
      <div className="main-content">
        <DashboardHeader />
        {loading ? (
          <div className="loading-message">Loading statistics...</div>
        ) : (
          <>
            <SummaryCards
              totalExpenses={totalExpenses}
              numberOfExpenses={numberOfExpenses}
            />
            <div className="statistics-section">
              <h2>Expense Statistics</h2>
              <div className="statistics-charts">
                {/* Top Row: Donut and Line Charts */}
                <div className="chart-row">
                  <div className="statistics-table">
                    <h3>Expense Distribution</h3>
                    <div className="chart-container">
                      <Doughnut
                        data={donutData}
                        options={{
                          plugins: {
                            legend: { position: "left" },
                          },
                          cutout: "50%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="statistics-table">
                    <h3>Monthly Expense Trend</h3>
                    <div className="chart-container">
                      <Line
                        data={lineData}
                        options={{
                          plugins: {
                            legend: { display: false },
                          },
                          scales: {
                            y: { beginAtZero: true },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Expense Category */}
                <div className="statistics-table full-width">
                  <h3>Expense Category</h3>
                  <div className="expense-category-container">
                    {Object.entries(expensesByCategory).map(([category, value], index) => {
                      const percentage = totalExpenses > 0 ? ((value / totalExpenses) * 100).toFixed(0) : 0;
                      return (
                        <div key={index} className="expense-category-row">
                          <span className="category-label">
                            {categoryTranslations[category] || category}
                          </span>
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                          <div className="value-container">
                            <span className="bar-value">{value}€</span>
                            <span className="bar-percentage">
                              {percentage}% of total expenses
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Existing Tables */}
              <div className="statistics-tables">
                <div className="statistics-table">
                  <h3>Expenses by Category</h3>
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Total (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(expensesByCategory).map(([category, total]) => (
                        <tr key={category}>
                          <td>{categoryTranslations[category] || category}</td>
                          <td>{total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="statistics-table">
                  <h3>Expenses by Mood</h3>
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Mood</th>
                        <th>Total (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(expensesByMood).map(([mood, total]) => (
                        <tr key={mood}>
                          <td>{moodEmojis[mood]} {mood}</td>
                          <td>{total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;