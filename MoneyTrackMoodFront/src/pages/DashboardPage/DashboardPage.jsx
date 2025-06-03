import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import ExpenseSection from "../../components/ExpenseSection/ExpenseSection";
import ExpenseFormModal from "../../components/ExpenseFormModal/ExpenseFormModal";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expenseForm, setExpenseForm] = useState({
    id: null,
    date: "",
    amount: 0,
    category: "TRANSPORT",
    description: "",
    mood: "HEUREUX",
  });
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const categoryTranslations = {
    TRANSPORT: "Transport",
    LOISIRS: "Leisure",
    SANTE: "Health",
    RESTAURATION: "Dining",
    AUTRE: "Other",
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
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
          }));
          setExpenses(normalizedData);
          setShowForm(normalizedData.length === 0);
        } else {
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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const matchesMood = moodFilter ? expense.mood === moodFilter : true;
    return matchesCategory && matchesMood;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm({
      ...expenseForm,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        date: expenseForm.date,
        montant: expenseForm.amount,
        categorie: expenseForm.category,
        description: expenseForm.description,
        humeur: expenseForm.mood,
      };

      const url = expenseForm.id
        ? `http://localhost:8081/depense/update/${expenseForm.id}`
        : "http://localhost:8081/depense/add";
      const method = expenseForm.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        const normalizedExpense = {
          ...updatedExpense,
          amount: updatedExpense.montant,
          category: updatedExpense.categorie,
          mood: updatedExpense.humeur,
        };

        if (expenseForm.id) {
          setExpenses((prev) =>
            prev.map((exp) =>
              exp.id === normalizedExpense.id ? normalizedExpense : exp
            )
          );
        } else {
          setExpenses((prev) => [...prev, normalizedExpense]);
        }

        setExpenseForm({
          id: null,
          date: "",
          amount: 0,
          category: "TRANSPORT",
          description: "",
          mood: "HEUREUX",
        });
        setShowForm(false);
      } else {
        console.error(`Failed to ${expenseForm.id ? "update" : "add"} expense`);
      }
    } catch (error) {
      console.error(`Error ${expenseForm.id ? "updating" : "adding"} expense:`, error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/depense/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setExpenses((prev) => {
          const updatedExpenses = prev.filter((exp) => exp.id !== id);
          setShowForm(updatedExpenses.length === 0);
          return updatedExpenses;
        });
      } else {
        console.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setExpenseForm({
      id: expense.id,
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || "",
      mood: expense.mood,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setExpenseForm({
      id: null,
      date: "",
      amount: 0,
      category: "TRANSPORT",
      description: "",
      mood: "HEUREUX",
    });
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, sender: "user", timestamp: new Date() };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      const payload = { question: chatInput };

      const response = await fetch("http://localhost:8081/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.answer || "No response from AI.";
        const parsedText = marked.parse(text, { breaks: true });
        setChatMessages((prev) => [
          ...prev,
          { text: parsedText, sender: "ai", timestamp: new Date() },
        ]);
        setChatInput("");
      } else {
        const errorText = await response.text();
        setChatMessages((prev) => [
          ...prev,
          { text: `Error: ${errorText}`, sender: "ai", timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatMessages((prev) => [
        ...prev,
        { text: "Error: Something went wrong.", sender: "ai", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar onLogout={handleLogout} />
      <div className="main-content">
        <DashboardHeader />
        {loading ? (
          <div className="loading-message">Loading expenses...</div>
        ) : (
          <>
            <SummaryCards
              totalExpenses={totalExpenses}
              numberOfExpenses={numberOfExpenses}
            />
            <ExpenseSection
              filteredExpenses={filteredExpenses}
              categoryTranslations={categoryTranslations}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              moodFilter={moodFilter}
              setMoodFilter={setMoodFilter}
              setShowForm={setShowForm}
              setExpenseForm={setExpenseForm}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </>
        )}
        {showForm && (
          <ExpenseFormModal
            expenseForm={expenseForm}
            handleInputChange={handleInputChange}
            handleSubmitExpense={handleSubmitExpense}
            handleCancel={handleCancel}
          />
        )}
        <button
          className="chat-button"
          onClick={() => setShowChat(!showChat)}
          title="Chat with Financial Advisor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
        {showChat && (
          <div className="chat-container">
            <div className="chat-header">
              <h3>Financial Advisor</h3>
              <button className="chat-close" onClick={() => setShowChat(false)}>
                ×
              </button>
            </div>
            <div className="chat-body">
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-response">
                  <div
                    className={`message ${msg.sender}`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  <span className="timestamp">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="chat-response">
                  <div className="message ai typing">Typing...</div>
                </div>
              )}
            </div>
            <form className="chat-form" onSubmit={handleChatSubmit}>
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for financial advice..."
                rows="3"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;