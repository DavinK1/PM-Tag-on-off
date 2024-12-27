import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import SignPic from "../../assets/images/sign/sign-example.png";

const EditData = () => {
  const navigate = useNavigate();

  // ใช้สำหรับเรียกข้อมูลจาก DATABASE ด้วย id ที่มาจากหน้า Main
  const { id } = useParams(); // ดึง id จาก URL params
  const [data, setData] = useState(null); // สถานะเพื่อเก็บข้อมูลที่ดึงมา
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(true); // สถานะการโหลด

  // สำหรับ Show รูปภาพ Problem Image
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleClickShowImage = () => {
    setShowModal(true); // เปิด modal เมื่อคลิก
  };

  const handleCloseShowImage = () => {
    setShowModal(false); // ปิด modal เมื่อคลิกปุ่ม "X"
  };

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
        {data.map((item) => (
          <div className={styles.gridHeader}>
            <div className={styles.gridHeaderItem1}>
              <button
                className={styles.gridHeaderButton}
                onClick={() => navigate(-1)}
                aria-label="กลับไปที่หน้าก่อนหน้า"
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
                onClick={() => navigate(`/editdata/${item.id}`)}
              >
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </button>
            </div>
          </div>
        ))}
      </header>

      <main className={styles.main}>
        {Object.entries(data).map(([key, item], index) => (
          <div key={index} className={styles.formContainer}>
            <form
              className={`${styles.gridContainer} ${
                item.tag_type === "RED" ? styles.forRedBackgroundColor : ""
              }`}
            >
              {/* Section 1 */}
              <div className={styles.formGroupSection1}>
                <div className={styles.formSubGroup1Section1}>
                  <div className={styles.formSubGroup1Section1Row1}>
                    <p className={styles.textLabel}>TAG แจ้งปัญหา : </p>
                    <p className={styles.textData}>
                      {item.tag_type || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup1Section1Row2}>
                    <p className={styles.textLabel}>No. : </p>
                    <p className={styles.textData}>
                      {item.id || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup2Section1}>
                  <div className={styles.formSubGroup2Section1Row1}>
                    <p className={styles.textLabel}>วันที่พบ : </p>
                    <p className={styles.textData}>
                      {item.receive_date || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup2Section1Row2}>
                    <p className={styles.textLabel}>Line : </p>
                    <p className={styles.textData}>
                      {item.line || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup3Section1}>
                  <div className={styles.formSubGroup3Section1Row1}>
                    <p className={styles.textLabel}>ชื่อผู้แจ้ง : </p>
                    <p className={styles.textData}>
                      {item.created_by || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                  <div className={styles.formSubGroup3Section1Row2}>
                    <p className={styles.textLabel}>ประเภท : </p>
                    <p className={styles.textData}>
                      {item.group_pic || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup4Section1}>
                  <div className={styles.formSubGroup4Section1Row1}>
                    <p className={styles.textLabel}>รายละเอียด : </p>
                    <p className={styles.textData}>
                      <span
                        style={{
                          fontWeight: "900",
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        {item.machine_no || "ไม่มีข้อมูล"}
                      </span>{" "}
                      <span>{item.problem_topic || "ไม่มีข้อมูล"}</span>
                    </p>
                  </div>
                </div>
                <div className={styles.formSubGroup5Section1}>
                  <div className={styles.formSubGroup5Section1Row1}>
                    <p className={styles.textLabel}>รูปภาพปัญหา : </p>
                    <button
                      className={styles.textDataProblemImage}
                      onClick={(e) => {
                        e.preventDefault(); // ป้องกันไม่ให้หน้ารีเฟรช
                        handleClickShowImage();
                      }}
                    >
                      {item.attachment || "ไม่มีข้อมูล"}
                      <FontAwesomeIcon
                        className={styles.searchProblemIcon}
                        icon={faSearch}
                      />
                    </button>
                    {showModal && item.attachment && (
                      <div
                        className={styles.modalOverlay}
                        onClick={handleCloseShowImage}
                      >
                        <div className={styles.modalContent}>
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={handleCloseShowImage}
                            className={styles.closeButton}
                            size="2x"
                          />
                          <img
                            src={
                              item.attachment
                                ? require(`../../assets/images/test/${item.attachment}`)
                                : "ไม่มีข้อมูลรูปภาพ"
                            }
                            alt="Attached"
                            className={styles.modalImage}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2 */}
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
                    <p className={styles.textLabel}></p>
                    <p className={styles.textData}>--------</p>
                  </div>
                </div>
              </div>

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
                        {item.date_prosign || "ไม่มีข้อมูล"}
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
                        {item.date_mtsign || "ไม่มีข้อมูล"}
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
