import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import SignPic from "../../assets/images/sign/sign-example.png";

const EditData = () => {
  const navigate = useNavigate();

  // ใช้สำหรับเรียกข้อมูลจาก DATABASE ด้วย id ที่มาจากหน้า Main
  const { id } = useParams(); // ดึง id จาก URL params
  const [data, setData] = useState(null); // สถานะเพื่อเก็บข้อมูลที่ดึงมา
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(true); // สถานะการโหลด

  // State สำหรับ form
  const [formData, setFormData] = useState({
    line: "",
    machine_no: "",
    operation_no: "",
    activity: "",
    tag_type: "",
    ctag_level: "",
    problem_type: "",
    komarigoto: "",
    problem_topic: "",
    counter_measure: "",
    created_by: "",
    shift: "",
    group_pic: "",
    editor_pic: "",
    receive_date: "",
    start_date: "",
    finish_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/transaction_logs/${id}`
        );
        console.log("Response Data:", response.data);

        // ถ้าข้อมูลที่ได้มาไม่ใช่ Array ให้แปลงหรือจัดการตามที่ต้องการ
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([response.data]); // แปลงเป็น Array ถ้าเป็น Object
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ตรวจสอบว่า data เป็น Array หรือไม่
  if (!Array.isArray(data)) {
    return <div>ข้อมูลไม่ถูกต้อง</div>;
  }

  // ถ้ายังโหลดข้อมูลอยู่
  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  // ถ้าไม่มีข้อมูล
  if (!data || data.length === 0) {
    return <div>ไม่พบข้อมูล</div>;
  }

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.gridHeader}>
          <div className={styles.gridHeaderItem1}>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate(-1)}
              aria-label="Go back to the previous page"
            >
              <FontAwesomeIcon icon={faCircleLeft} size="2x" />
            </button>
          </div>

          <div className={styles.gridHeaderItem2}>
            <p>แจ้งปัญหาและปรับปรุงเครื่องจักร</p>
          </div>

          <div className={styles.gridHeaderItem3}>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {Object.entries(data).map(([key, item], index) => (
          <div key={index} className={styles.formContainer}>
            <p className={styles.textTitleHeader}>
              แก้ไขข้อมูล{" "}
              <span className={styles.textTitleHeaderDisplay}>
                No. {item.id}
              </span>
            </p>
            <form
              className={`${styles.gridContainer} ${
                item.tag_type === "RED" ? styles.forRedBackgroundColor : ""
              }`}
            >
              {/* Section 1 */}
              <div className={styles.formGroupSection1}>
                <div className={styles.formSubGroup1Section1}>
                  <div className={styles.formSubGroup1Section1Row1}>
                    <p className={styles.textLabel}>Machine No : </p>
                    <input
                      id="tag_type"
                      className={`${styles.textData} ${styles.formInput}`}
                      value={item.machine_no || "ไม่มีข้อมูล"}
                      type="text"
                    />
                  </div>
                  <div className={styles.formSubGroup1Section1Row2}>
                    <p className={styles.textLabel}>Activity : </p>
                    <p className={styles.textData}>
                      {item.activity || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup2Section1}>
                  <div className={styles.formSubGroup2Section1Row1}>
                    <p className={styles.textLabel}>ประเภท TAG: </p>
                  </div>
                  <div className={styles.formSubGroup2Section1Row2}>
                    <p className={styles.textLabel}>TAG Level : </p>
                    <p className={styles.textData}>
                      {item.ctag_level || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup3Section1}>
                  <div className={styles.formSubGroup3Section1Row1}>
                    <p className={styles.textLabel}>ประเภทปัญหา : </p>
                    <p className={styles.textData}>
                      {item.tag_type || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup3Section1Row2}>
                    <p className={styles.textLabel}>Komarigoto : </p>
                    <p className={styles.textData}>
                      {item.komarigoto || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup4Section1}>
                  <div className={styles.formSubGroup4Section1Row1}>
                    <p className={styles.textLabel}>หัวข้อปัญหา : </p>
                    <textarea
                      id="problem_topic"
                      className={styles.textDataArea}
                      value={item.problem_topic}
                    />
                  </div>
                  <div className={styles.formSubGroup4Section1Row2}>
                    <p className={styles.textLabel}>แนวทางการแก้ปัญหา : </p>
                    <textarea
                      id="counter_measure"
                      className={styles.textDataArea}
                      value={item.counter_measure}
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup5Section1}>
                  <div className={styles.formSubGroup5Section1Row1}>
                    <p className={styles.textLabel}>Machine No : </p>
                    <input
                      id="tag_type"
                      className={`${styles.textData} ${styles.formInput}`}
                      value={item.machine_no || "ไม่มีข้อมูล"}
                      type="text"
                    />
                  </div>
                  <div className={styles.formSubGroup5Section1Row2}>
                    <p className={styles.textLabel}>วันที่แจ้งปัญหา : </p>
                    <input
                      id="start_date"
                      className={`${styles.textData} ${styles.formInput}`}
                      value={item.start_date || "ไม่มีข้อมูล"}
                      type="date"
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup6Section1}>
                  <div className={styles.formSubGroup6Section1Row1}>
                    <p className={styles.textLabel}>ประเภทผู้รับผิดชอบ : </p>
                    <input
                      id="tag_type"
                      className={`${styles.textData} ${styles.formInput}`}
                      value={item.machine_no || "ไม่มีข้อมูล"}
                      type="text"
                    />
                  </div>
                  <div className={styles.formSubGroup6Section1Row2}>
                    <p className={styles.textLabel}>ผู้แก้ไขปัญหา : </p>
                    <input
                      id="start_date"
                      className={`${styles.textData} ${styles.formInput}`}
                      value={item.start_date || "ไม่มีข้อมูล"}
                      type="date"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2
              <div className={styles.formGroupSection2}>
                {item.tag_type === "RED" && (
                  <div className={styles.formSubGroup1Section2}>
                    <div className={styles.formSubGroup1Section2Row1}>
                      <p className={styles.textLabel}>วันที่รับเรื่อง : </p>
                      <p className={styles.textData}>
                        {item.receive_date || "ไม่มีข้อมูล"}
                      </p>
                    </div>
                  </div>
                )}
                <div className={styles.formSubGroup2Section2}>
                  <div className={styles.formSubGroup2Section2Row1}>
                    <p className={styles.textLabel}>แผนการแก้ไข : </p>
                    <p className={styles.textData}>
                      {item.end_date || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup2Section2Row2}>
                    <p className={styles.textLabel}>วันที่เสร็จสิ้น : </p>
                    <p className={styles.textData}>
                      {item.finish_date || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup3Section2}>
                  <div className={styles.formSubGroup3Section2Row1}>
                    <p className={styles.textLabel}>ผู้แก้ไข : </p>
                    <p className={styles.textData}>
                      {item.tag_type || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup3Section2Row2}>
                    <p className={styles.textLabel}>รูปภาพปัญหา : </p>
                    <p className={styles.textData}>--------</p>
                  </div>
                </div>
              </div> */}

              <hr className={styles.LineHrSection1_2} />

              {/* Section 3 */}
              <div className={styles.formGroupSection3}>
                <div className={styles.formSubGroup1Section3}>
                  <div className={styles.formSubGroup1Section3Row1}>
                    <div className={styles.formSubGroup1Section3Row1SubRow1}>
                      <div className={styles.formGlProdLabel}>GL Prod</div>
                      <div className={styles.formGlProdSign}>
                        <img
                          className={styles.imgGlProdSign}
                          src={SignPic}
                          alt={SignPic}
                        />
                      </div>
                      <div className={styles.formGlProdDate}>
                        {item.date_prosign || "ไม่มีข้อมูลวันที่"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSubGroup1Section3Row2}>
                    <div className={styles.formSubGroup1Section3Row2SubRow1}>
                      <div className={styles.formGlmtLabel}>GL M/T Sign</div>
                      <div className={styles.formGlmtSign}>
                        <img
                          className={styles.imgGlmtSign}
                          src={SignPic}
                          alt={SignPic}
                        />
                      </div>
                      <div className={styles.formGlmtDate}>
                        {item.date_mtsign || "ไม่มีข้อมูลวันที่"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSubGroup1Section3Row3}>
                    <div className={styles.formSubGroup1Section3Row3SubRow1}>
                      <p className={styles.formLabelTestText}>TAG</p>
                      <p
                        className={styles.formLabelTestDisplay}
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
                        {item.test || "ไม่มีข้อมูล"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ))}
      </main>
    </>
  );
};

export default EditData;
