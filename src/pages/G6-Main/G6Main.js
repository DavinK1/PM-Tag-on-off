import React, { useState, useEffect } from "react";
import styles from "./G6Main.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DropdownsubHeader from "../../components/dropdownsubHeader/dropdownsubHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const G6Main = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/transactions")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction:", error);
      });
  }, []);

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
              onClick={() => navigate("/")}
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
            <DropdownsubHeader />
          </div>
        </div>
      </div>

      <main className={styles.main}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.mainCardHeader}>
              <p className={styles.mainMachineId}>STGR-0163</p>
              <p className={styles.mainDate}>18/12/24</p>
            </div>
            <div className={styles.mainCardBody}>
              <p className={styles.mainProblem}>ปัญหา: xxxxxxxxxxxxxxxxxx</p>
              <p className={styles.mainTagInfo}>TAG No: 166 | Tag Type: RED</p>
            </div>
            <div className={styles.mainCardFooter}>
              <span className={styles.mainStatusDelay}>DELAY</span>
              <span className={styles.mainShift}>Shift: W</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default G6Main;
