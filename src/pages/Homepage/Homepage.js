import React from "react";
import styles from "./Homepage.module.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import ReactDOM, {render} from 'react-dom'

const Homepage = () => {
  const navigate = Router(); // Hook สำหรับการนำทาง

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
              onClick={() => navigate("/g6-main")}
            >
              G6-Main
            </button>
          </div>

          {/* คอลัมน์ 2 */}
          <div className={styles.gridItem}>
            <div className={styles.typeText}>(K)</div>
            <button
              className={styles.button}
              onClick={() => navigate("/g6-block")}
            >
              G6-Block
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6-head")}
            >
              G6-Head
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6-crank")}
            >
              G6-Crank
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/g6-camshaft")}
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