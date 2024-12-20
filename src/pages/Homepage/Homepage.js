import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const navigate = useNavigate(); // Access navigate function

  const goToG6Block = () => {
    navigate("/g6block"); // Programmatic navigation to /g6block
  };

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={goToG6Block}>ไปที่หน้า g6block</button>
    </div>
  );
};

export default Homepage;
