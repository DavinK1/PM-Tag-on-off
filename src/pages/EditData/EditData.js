import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import noSignPic from "../../assets/images/sign/no-sign-example.jpg";

const EditData = () => {
  const navigate = useNavigate();

  // ใช้สำหรับเรียกข้อมูลจาก DATABASE ด้วย id ที่มาจากหน้า Main
  const { id } = useParams(); // ดึง id จาก URL params
  const [data, setData] = useState(null); // สถานะเพื่อเก็บข้อมูลที่ดึงมา
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true); // สถานะการโหลด

  // State สำหรับ form
  const [formData, setFormData] = useState({
    id: "",
    machine_no: "",
    operation_no: "",
    line: "",
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
    gl_mt2: "",
    gl_prod2: "",
    date_prosign: "",
    date_mtsign: "",
  });

  // สำหรับ format date input ที่มาจาก API ให้แสดงใน Input ของ Form ได้
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ฟังก์ชันสำหรับอัปเดตค่าใน form
  const handleChange = (e) => {
    const { id, value } = e.target;

    // ปรับค่าของ formData ตาม input ที่เปลี่ยน
    setFormData((prevData) => {
      let newFormData = {
        ...prevData,
        [id]: value,
      };

      // ถ้า tag_type ไม่ใช่ "Challenge ให้ ctag_level เป็น null"
      if (id === "tag_type" && value !== "Challenge") {
        newFormData.ctag_level = null;
      }

      // ถ้า problem_type ไม่ใช่ "Komarigoto" ให้ komarigoto เป็น null
      if (id === "problem_type" && value !== "Komarigoto") {
        newFormData.komarigoto = null;
      }

      return newFormData;
    });
  };

  // ฟังก์ชันส่งข้อมูลไปอัพเดตใน API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/transaction_logs/updatetransaction_logs/${formData.id}`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "ข้อมูลถูกอัปเดตเรียบร้อย!",
          confirmButtonColor: "#3085d6",
        });
        navigate(-1); // หรือไปยังหน้าอื่นที่ต้องการ
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${error}`,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/transaction_logs/${id}`
        );
        console.log("Response Data:", response.data);

        // If the data is not an array, convert it to one
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([response.data]); // Convert to array if it's an object
        }

        // Update formData with the fetched data (assuming response.data contains the fields matching your form)
        setFormData({
          id: response.data.id || "",
          machine_no: response.data.machine_no || "",
          operation_no: response.data.operation_no || "",
          line: response.data.line || "",
          activity: response.data.activity || "",
          tag_type: response.data.tag_type || "",
          ctag_level: response.data.ctag_level || "",
          problem_type: response.data.problem_type || "",
          komarigoto: response.data.komarigoto || "",
          problem_topic: response.data.problem_topic || "",
          counter_measure: response.data.counter_measure || "",
          created_by: response.data.created_by || "",
          shift: response.data.shift || "",
          group_pic: response.data.group_pic || "",
          editor_pic: response.data.editor_pic || "",
          receive_date: response.data.receive_date || "",
          start_date: response.data.start_date || "",
          finish_date: response.data.finish_date || "",
          end_date: response.data.end_date || "",
          gl_mt2: response.data.gl_mt2 || "",
          gl_prod2: response.data.gl_prod2 || "",
          date_prosign: response.data.date_prosign || "",
          date_mtsign: response.data.date_mtsign || "",
        });
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
              aria-label="กลับไปที่หน้าก่อนหน้า"
            >
              <FontAwesomeIcon icon={faCircleLeft} size="2x" />
            </button>
          </div>

          <div className={styles.gridHeaderItem2}>
            <p>แจ้งปัญหาและปรับปรุงเครื่องจักร</p>
          </div>

          <div className={styles.gridHeaderItem3}>
            <button className={styles.gridHeaderButton} onClick={handleSubmit}>
              <FontAwesomeIcon icon={faSave} size="2x" />
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
            <form className={`${styles.gridContainer}`}>
              {/* Section 1 */}
              <div className={styles.formGroupSection1}>
                <div className={styles.formSubGroup1Section1}>
                  {/* machine_no */}
                  <div className={styles.formSubGroup1Section1Row1}>
                    <p className={styles.textLabel}>
                      <span style={{ color: "crimson" }}>* </span>Machine No :{" "}
                    </p>
                    <input
                      id="machine_no"
                      className={` ${styles.formInput}`}
                      value={formData.machine_no || "ไม่มีข้อมูล"}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Line */}
                  <input
                    id="line"
                    className={styles.formInput}
                    value={formData.line || "ไม่มีข้อมูล"}
                    type="hidden"
                    onChange={handleChange}
                  />

                  {/* Activity */}
                  <div className={styles.formSubGroup1Section1Row2}>
                    <p className={styles.textLabel}>Activity : </p>
                    <select
                      id="activity"
                      className={`${styles.formSelect}`}
                      value={formData.activity || ""}
                      onChange={handleChange}
                    >
                      <option
                        className={`${styles.labelOption} ${styles.placeholderOption}`}
                        value=""
                        disabled
                      >
                        เลือก Activity
                      </option>
                      <option
                        className={styles.labelOption}
                        value="Daily Check"
                      >
                        Daily Check
                      </option>
                      <option
                        className={styles.labelOption}
                        value="Deep Cleaning"
                      >
                        Deep Cleaning
                      </option>
                    </select>
                  </div>
                </div>
                <div className={styles.formSubGroup2Section1}>
                  {/* Tag Type */}
                  <div className={styles.formSubGroup2Section1Row1}>
                    <p className={styles.textLabel}>ประเภท TAG: </p>
                    <select
                      id="tag_type"
                      className={`${styles.formSelect}`}
                      value={formData.tag_type || ""}
                      onChange={handleChange}
                    >
                      <option
                        className={`${styles.labelOption} ${styles.placeholderOption}`}
                        value=""
                        disabled
                      >
                        เลือกประเภท TAG
                      </option>
                      <option className={styles.labelOption} value="WHITE">
                        WHITE
                      </option>
                      <option className={styles.labelOption} value="RED">
                        RED
                      </option>
                      <option className={styles.labelOption} value="Challenge">
                        Challenge
                      </option>
                    </select>
                  </div>

                  {/* C TAG level */}
                  {formData.tag_type === "Challenge" && (
                    <div className={styles.formSubGroup2Section1Row2}>
                      <p className={styles.textLabel}>TAG Level : </p>
                      <select
                        id="ctag_level"
                        className={`${styles.formSelect}`}
                        value={formData.ctag_level || ""}
                        onChange={handleChange}
                      >
                        <option
                          className={`${styles.labelOption} ${styles.placeholderOption}`}
                          value=""
                          disabled
                        >
                          เลือก TAG Level
                        </option>
                        <option className={styles.labelOption} value="A">
                          A
                        </option>
                        <option className={styles.labelOption} value="B">
                          B
                        </option>
                        <option className={styles.labelOption} value="C">
                          C
                        </option>
                      </select>
                    </div>
                  )}
                </div>

                <div className={styles.formSubGroup3Section1}>
                  {/* problem_type */}
                  <div className={styles.formSubGroup3Section1Row1}>
                    <p className={styles.textLabel}>ประเภทปัญหา : </p>
                    <select
                      id="problem_type"
                      className={`${styles.formSelect}`}
                      value={formData.problem_type || ""}
                      onChange={handleChange}
                    >
                      <option
                        className={`${styles.labelOption} ${styles.placeholderOption}`}
                        value=""
                        disabled
                      >
                        ประเภทปัญหา
                      </option>
                      <option className={styles.labelOption} value="Fault item">
                        Fault item
                      </option>
                      <option className={styles.labelOption} value="Komarigoto">
                        Komarigoto
                      </option>
                    </select>
                  </div>

                  {/* Komarigoto */}
                  {formData.problem_type === "Komarigoto" && (
                    <div className={styles.formSubGroup3Section1Row2}>
                      <p className={styles.textLabel}>Komarigoto : </p>
                      <select
                        id="komarigoto"
                        className={`${styles.formSelect}`}
                        value={formData.komarigoto || ""}
                        onChange={handleChange}
                      >
                        <option
                          className={`${styles.labelOption} ${styles.placeholderOption}`}
                          value=""
                          disabled
                        >
                          Komarigoto
                        </option>
                        <option
                          className={styles.labelOption}
                          value="ตรวจสอบยาก"
                        >
                          ตรวจสอบยาก
                        </option>
                        <option className={styles.labelOption} value="4S ยาก">
                          4S ยาก
                        </option>
                        <option className={styles.labelOption} value="ทำงานยาก">
                          ทำงานยาก
                        </option>
                      </select>
                    </div>
                  )}
                </div>

                <div className={styles.formSubGroup4Section1}>
                  {/* Problem Topic */}
                  <div className={styles.formSubGroup4Section1Row1}>
                    <p className={styles.textGroup4Label}>หัวข้อปัญหา : </p>
                    <textarea
                      id="problem_topic"
                      className={styles.textDataArea}
                      value={formData.problem_topic}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Counter Measure */}
                  <div className={styles.formSubGroup4Section1Row2}>
                    <p className={styles.textGroup4Label}>
                      แนวทางการแก้ปัญหา :{" "}
                    </p>
                    <textarea
                      id="counter_measure"
                      className={styles.textDataArea}
                      style={{ color: item.counter_measure ? "black" : "red" }}
                      value={formData.counter_measure || "-"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup5Section1}>
                  {/* Created By */}
                  <div className={styles.formSubGroup5Section1Row1}>
                    <p className={styles.textLabel}>
                      <span style={{ color: "crimson" }}>* </span>
                      ผู้แจ้งปัญหา :{" "}
                    </p>
                    <input
                      id="created_by"
                      className={` ${styles.formInput}`}
                      style={{ color: item.created_by ? "black" : "red" }}
                      value={formData.created_by || "-"}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Start Date */}
                  <div className={styles.formSubGroup5Section1Row2}>
                    <p className={styles.textLabel}>วันที่แจ้งปัญหา : </p>
                    <input
                      id="start_date"
                      className={` ${styles.formInput}`}
                      value={formatDate(formData.start_date)}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup6Section1}>
                  {/* Group Pic */}
                  <div className={styles.formSubGroup6Section1Row1}>
                    <p className={styles.textLabel}>ประเภทผู้รับผิดชอบ : </p>
                    <input
                      id="group_pic"
                      className={` ${styles.formInput}`}
                      value={formData.group_pic || "ไม่มีข้อมูล"}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formSubGroup6Section1Row2}>
                    <p className={styles.textLabel}>ผู้แก้ไขปัญหา : </p>
                    <input
                      id="editor_pic"
                      className={` ${styles.formInput}`}
                      style={{ color: item.editor_pic ? "black" : "red" }}
                      value={formData.editor_pic || "-"}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup7Section1}>
                  {/* Receive Date */}
                  <div className={styles.formSubGroup7Section1Row1}>
                    <p className={styles.textLabel}>วันที่รับเรื่อง : </p>
                    <input
                      id="receive_date"
                      className={` ${styles.formInput}`}
                      value={formatDate(formData.receive_date)}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Finish Date */}
                  <div className={styles.formSubGroup7Section1Row2}>
                    <p className={styles.textLabel}>วันที่กำหนดเสร็จ : </p>
                    <input
                      id="finish_date"
                      className={` ${styles.formInput}`}
                      value={formatDate(formData.finish_date)}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.formSubGroup8Section1}>
                  {/* End Date */}
                  <div className={styles.formSubGroup8Section1Row1}>
                    <p className={styles.textLabel}>วันที่เสร็จ : </p>
                    <input
                      id="end_date"
                      className={` ${styles.formInput}`}
                      value={formatDate(formData.end_date)}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formSubGroup8Section1Row2}></div>
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
                          src={
                            formData.gl_prod2
                              ? require(`../../assets/images/sign/${formData.gl_prod2}`)
                              : noSignPic
                          }
                          alt={"gl_prod2 Sign"}
                        />
                      </div>
                      <div className={styles.formGlProdDate}>
                        <input
                          id="date_prosign"
                          className={` ${styles.formInput}`}
                          value={formatDate(formData.date_prosign)}
                          type="date"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSubGroup1Section3Row2}>
                    <div className={styles.formSubGroup1Section3Row2SubRow1}>
                      <div className={styles.formGlmtLabel}>GL M/T Sign</div>
                      <div className={styles.formGlmtSign}>
                        <img
                          className={styles.imgGlmtSign}
                          src={
                            formData.gl_mt2
                              ? require(`../../assets/images/sign/${formData.gl_mt2}`)
                              : noSignPic
                          }
                          alt={"gl_mt2 Sign"}
                        />
                      </div>
                      <div className={styles.formGlmtDate}>
                        <input
                          id="date_mtsign"
                          className={` ${styles.formInput}`}
                          value={formatDate(formData.date_mtsign)}
                          type="date"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.formSubGroup1Section3Row3}>
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
                  </div> */}
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
