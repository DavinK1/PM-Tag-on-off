import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const EditData = () => {
  const navigate = useNavigate();

  // ใช้สำหรับเรียกข้อมูลจาก DATABASE ด้วย id ที่มาจากหน้า Main
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/transaction_logs/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error("Unexpected response type. Expected JSON.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
              <FontAwesomeIcon icon={faSave} size="2x" />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div className={styles.formContainer}>
            <form className={styles.gridContainer}>
              {/* Section 1 */}
              <div className={styles.formGroupSection1}>
                <div className={styles.formSubGroup1Section1}>
                  <div className={styles.formSubGroup1Section1Row1}>
                    <p className={styles.textLabel}>TAG แจ้งปัญหา : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                  <div className={styles.formSubGroup1Section1Row2}>
                    <p className={styles.textLabel}>No. : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup2Section1}>
                  <div className={styles.formSubGroup2Section1Row1}>
                    <p className={styles.textLabel}>วันที่พบ : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                  <div className={styles.formSubGroup2Section1Row2}>
                    <p className={styles.textLabel}>Line : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup3Section1}>
                  <div className={styles.formSubGroup3Section1Row1}>
                    <p className={styles.textLabel}>ชื่อผู้แจ้ง : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                  <div className={styles.formSubGroup3Section1Row2}>
                    <p className={styles.textLabel}>ประเภท : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup4Section1}>
                  <div className={styles.formSubGroup4Section1Row1}>
                    <p className={styles.textLabel}>รายละเอียด : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup5Section1}>
                  <div className={styles.formSubGroup5Section1Row1}>
                    <p className={styles.textLabel}>รูปภาพปัญหา : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className={styles.formGroupSection2}>
                <div className={styles.formSubGroup1Section2}>
                  <div className={styles.formSubGroup1Section2Row1}>
                    <p className={styles.textLabel}>วันที่รับเรื่อง : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup2Section2}>
                  <div className={styles.formSubGroup2Section2Row1}>
                    <p className={styles.textLabel}>แผนการแก้ไข : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                  <div className={styles.formSubGroup2Section2Row2}>
                    <p className={styles.textLabel}>วันที่เสร็จสิ้น : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                </div>
                <div className={styles.formSubGroup3Section2}>
                  <div className={styles.formSubGroup3Section2Row1}>
                    <p className={styles.textLabel}>ผู้แก้ไข : </p>
                    <p className={styles.textData}>Sample</p>
                  </div>
                  <div className={styles.formSubGroup3Section2Row2}>
                    <p className={styles.textLabel}>รูปภาพปัญหา : </p>
                    <p className={styles.textData}>--------</p>
                  </div>
                </div>
              </div>

              <hr className={styles.LineHrSection1_2} />

              {/* Section 3 */}
              <div className={styles.formGroupSection3}>
                <h1 className={styles.textSection3}>Section 3</h1>
              </div>
            </form>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </main>
    </>
  );
};

export default EditData;
