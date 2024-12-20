import React, { useState, useEffect } from "react";
import styles from "./G6Main.module.css";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const G6Main = () => {
  const navigate = useNavigate();

  // สำหรับ Dropdown
  const [selectedItem, setSelectedItem] = useState("เลือกเมนู");
  const [bgColor, setBgColor] = useState("#ffffff");
  const items = ["ไอเทมที่ 1", "ไอเทมที่ 2", "ไอเทมที่ 3", "ไอเทมที่ 4"];

  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const handleSelect = (item) => {
    setSelectedItem(item);
    setBgColor(randomColor());
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.gridheader}>
          <div className={styles.gridHeaderItem1}>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faCircleLeft} size="2x" />
            </button>
            <p>รายการแจ้งซ่อม</p>
          </div>
          <div className={styles.gridHeaderItem2}>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate("/add")}
            >
              <FontAwesomeIcon icon={faArrowsRotate} size="2x" />
            </button>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faArrowUpAZ} size="2x" />
            </button>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.subHeader}>
        <div className={styles.gridsubHeader}>
          <div className={styles.gridsubHeaderItem}>
            <p>Dropdown 1</p>
            <p>Dropdown 1</p>
            <p>Dropdown 1</p>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <p>Main</p>
      </main>
    </div>
  );
};

export default G6Main;
