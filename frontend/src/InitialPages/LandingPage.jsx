import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  const navigateToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className={styles.container}>
      {/* Left Side: Buttons */}
      <div className={styles.leftContainer}>
        <h1 className={styles.title}>Welcome to My Ecommerce platform</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={navigateToLogin}>
            Login
          </button>
          <button className={styles.button} onClick={navigateToSignup}>
            Signup
          </button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className={styles.imageSection}></div>
    </div>
  );
};

export default LandingPage;
