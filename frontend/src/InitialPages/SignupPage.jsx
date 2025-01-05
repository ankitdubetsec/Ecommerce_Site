import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import styles from "./SignupPage.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/users/signup",
        {
          name,
          email,
          password,
        }
      );

      // Show success toast notification
      toast.success(response.data.message || "User registered successfully!", {
        position: "top-right",
        autoClose: 2000, // 2 seconds
      });

      // Navigate to the login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Match toast duration
    } catch (err) {
      // Show error toast notification
      if (err.response) {
        toast.error(
          err.response.data.message || "Signup failed. Please try again.",
          {
            position: "top-right",
            autoClose: 3000, // 3 seconds
          }
        );
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className={styles.imageSection}></div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
