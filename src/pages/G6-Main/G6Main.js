/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import styles from "./G6Main.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DropdownsubHeader from "../../components/dropdownsubHeader/dropdownsubHeader";
import workingImage from "../../assets/images/profile/lukehemmings.jpg";

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
            <div className={styles.mainGridCard}>
              <div className={styles.mainLeftCard}>
                <img
                  className={styles.workingImage}
                  src={workingImage}
                  alt="Working Picture"
                />
              </div>
              <div className={styles.mainCenterCard}>
                <div className={styles.mainGridCenterCard}>
                  <p className={styles.mainMachineId}>STGR-0163</p>
                  <p className={styles.mainProblemText}>
                    ปัญหา : <span>xxxxxxxxxx</span>
                  </p>
                  <div className={styles.mainGridTagInfo}>
                    <p className={styles.mainTextTagNumber}>
                      TAG No : <span>166</span>
                    </p>
                    <p className={styles.mainTextTagType}>
                      Tag Type : <span>RED</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.mainRightCard}>
                <div className={styles.mainGridRightCard}>
                  <p className={styles.mainTextDate}>23/12/2024</p>
                  <p className={styles.mainTextTest}>OFF</p>
                  <p className={styles.mainTextShift}>
                    Shift : <span>RED</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default G6Main;
