import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import "./styles.css";
import CreateAccount from "./pages/CreateAccount.jsx";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/journal" element={<div>Journal Page</div>} /> 
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/DashboardPage" element={<DashboardPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
