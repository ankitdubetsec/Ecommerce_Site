import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Shop
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </li>
          <li className="cart-icon">
            <Link to="/cart" className="navbar-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
