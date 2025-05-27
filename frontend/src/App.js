import Header from './components/common/Header'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Summaries from './pages/UserSummaries';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/summaries" element={<Summaries />} />
      </Routes>
    </Router>
  );
}

export default App;
