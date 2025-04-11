import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import "./styles.css";
import CreateAccount from "./pages/CreateAccount.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/DashboardPage" element={<DashboardPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
