import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./InitialPages/LandingPage";
import Login from "./InitialPages/LoginPage";
import Signup from "./InitialPages/SignupPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/cart/getCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const items = response.data.cart.items;
        const totalQuantity = items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Error fetching cart count", error);
      }
    };

    fetchCartCount();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
