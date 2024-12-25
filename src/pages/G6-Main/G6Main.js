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
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const G6Main = ({ id }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/transaction_logs")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("เกิดปัญในการเรียกใช้ข้อมูล:", error);
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
              onClick={() => navigate("/AddData")}
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
                  <p className={styles.mainMachineId}>{item.machine_no}</p>
                  <p className={styles.mainProblemText}>
                    ปัญหา : <span>{item.problem_topic}</span>
                  </p>
                  <div className={styles.mainGridTagInfo}>
                    <p className={styles.mainTextTagNumber}>
                      TAG No : <span>{item.id}</span>
                    </p>
                    <p className={styles.mainTextTagType}>
                      Tag Type : <span>{item.tag_type}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.mainRightCard}>
                <div className={styles.mainGridRightCard}>
                  <p className={styles.mainTextDate}>{item.receive_date}</p>
                  <p
                    className={styles.mainTextTest}
                    style={{
                      backgroundColor:
                        item.test === "OFF"
                          ? "#16a34a" // เขียว
                          : item.test === "ON"
                          ? "#facc15" // เหลือง
                          : item.test === "DELAY"
                          ? "#dc2626" // แดง
                          : "#ffffff", // ขาว (default)
                      color:
                        item.test === "OFF"
                          ? "#ffffff" // ขาว
                          : item.test === "ON"
                          ? "#000000" // ดำ
                          : item.test === "DELAY"
                          ? "#ffffff" // ขาว
                          : "#000000", // ดำ (default)
                    }}
                  >
                    {item.test}
                  </p>
                  <p className={styles.mainTextShift}>
                    Shift : <span>{item.shift}</span>
                  </p>
                </div>
              </div>
              <div className={styles.mainForDetail}>
                <FontAwesomeIcon
                  className={styles.faAngleRight}
                  icon={faAngleRight}
                  size="2x"
                  onClick={() => navigate(`/editdata/${id}`)}
                />
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default G6Main;
