import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./LoginPage.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      const userData = response.data;
      if (userData.token && userData.name) {
        localStorage.setItem("token", userData.token);
        console.log(userData.token);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        console.log("User data and token not found");
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          err.response.data.message || "Login failed. Please try again.",
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
      console.error("Error during login:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.imageSection}></div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
