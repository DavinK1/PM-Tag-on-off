import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const navigate = useNavigate(); // Access navigate function

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p>PM TAG</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.gridContainer}>
          {/* คอลัมน์ 1 */}
          <div className={styles.gridItem}>
            <div className={styles.typeText}>(W)</div>
            <button
              className={styles.button}
              onClick={() => navigate("/g6main")}
            >
              G6-Main
            </button>
          </div>

          {/* คอลัมน์ 2 */}
          <div className={styles.gridItem}>
            <div className={styles.typeText}>(K)</div>
            <button
              className={styles.button}
              onClick={() => navigate("/g6block")}
            >
              G6-Block
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6head")}
            >
              G6-Head
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6crank")}
            >
              G6-Crank
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6camshaft")}
            >
              G6-Camshaft
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
