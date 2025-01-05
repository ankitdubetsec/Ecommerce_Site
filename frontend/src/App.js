import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./InitialPages/LandingPage";
import Login from "./InitialPages/LoginPage";
import Signup from "./InitialPages/SignupPage";
import ProductListPage from "./pages/ProductListPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProductListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
