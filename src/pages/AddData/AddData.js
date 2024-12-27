/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import styles from "./AddData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const AddData = () => {
  const navigate = useNavigate();

  // สำหรับเรียกใช้ API ทั้งหมด
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // สำหรับแสดงและซ่อนฟอร์ม Komarigoto และ Challenge
  const [showKomarigoto, setShowKomarigoto] = useState(false);
  const [showTagLevel, setShowTagLevel] = useState(false);

  // สำหรับดึงข้อมูลในตาราง master_mc_g6m ในการเช็คข้อมูล
  const [lineTitleData, setLineTitleData] = useState([]);

  // ใช้สำหรับการเก็บข้อมูลใน INPUT เพื่อนำไป Insert ใน DATABASE POSTGRES

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

  // ฟังก์ชันสำหรับ handle การเปลี่ยนแปลงใน form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // ตรวจสอบค่า formData ก่อนส่ง
  console.log("FormData: ", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Validate Input Machine No. และ Created_by ในกรณีที่ไม่ได้กรอกค่า
    if (!formData.machine_no) {
      alert("กรุณากรอกข้อมูลในช่อง Machine No.");
      return; // Prevent form submission if validation fails
    }

    if (!formData.created_by) {
      alert("กรุณากรอกข้อมูลในช่อง ผู้แจ้งปัญหา");
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/transaction_logs/inserttransaction_logs",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("ข้อมูลถูกเพิ่มเรียบร้อย!");
      setFormData({
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
    } catch (error) {
      console.error("Error adding data:", error);
      const errorMessage = error.response
        ? error.response.data.message || "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์"
        : "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // เรียกข้อมูล API ของ master_mc_g6m
  useEffect(() => {
    axios
      .get("http://localhost:4000/master_mc_g6m/line_title_g6_main")
      .then((response) => {
        setData(response.data);
        setLineTitleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ทำให้ receiveDate มีค่าเท่ากับ startDate
  useEffect(() => {
    if (formData.start_date) {
      setFormData((prevData) => ({
        ...prevData,
        receiveDate: prevData.start_date,
      }));
    }
  }, [formData.start_date]);

  // เมื่อเลือก machineNo ให้ทำการตรวจสอบว่า line_title ตรงกับเครื่องที่เลือกหรือไม่
  useEffect(() => {
    if (formData.machine_no) {
      const lineData = lineTitleData.find(
        (item) => item.line_name === formData.machine_no
      );
      setFormData((prevData) => ({
        ...prevData,
        line: lineData ? lineData.line_title : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, line: "" }));
    }
  }, [formData.machine_no, lineTitleData]);

  useEffect(() => {
    setShowKomarigoto(formData.problem_type === "Komarigoto");
    setShowTagLevel(formData.tag_type === "Challenge");
  }, [formData.problem_type, formData.tag_type]);

  return (
    <div className={styles.container}>
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
              onClick={handleSubmit}
              type="button"
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faSave} size="2x" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form className={styles.gridContainer}>
            {/* Line */}
            <div className={`${styles.formGroupLine} ${styles.formGroup}`}>
              <label
                htmlFor="line"
                className={`${styles.formLabel} ${styles.lineLabel}`}
              >
                <span className={styles.signStarLine}>*</span> Line
              </label>
              <input
                type="text"
                id="line"
                className={styles.formInput}
                value={formData.line}
                onChange={handleChange}
                required
              />
            </div>

            {/* Machine No. */}
            <div className={`${styles.formGroupMachineNo} ${styles.formGroup}`}>
              <label htmlFor="machine_no" className={styles.formLabel}>
                Machine No.
              </label>
              <select
                id="machine_no"
                className={`${styles.formSelect} ${styles.labelSelectMachineNo}`}
                value={formData.machine_no}
                onChange={handleChange}
                required
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือก Machine
                </option>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <option
                      key={index}
                      className={styles.labelOption}
                      value={item.line_name}
                    >
                      {item.line_name}
                    </option>
                  ))
                ) : (
                  <option
                    className={`${styles.labelOption} ${styles.placeholderOption}`}
                  >
                    ไม่มีข้อมูล
                  </option>
                )}
              </select>
            </div>

            {/* OP No. */}
            <div className={`${styles.formGroupOpNo} ${styles.formGroup}`}>
              <label htmlFor="operation_no" className={styles.formLabel}>
                OP No.
              </label>
              <input
                type="text"
                id="operation_no"
                className={styles.formInput}
                value={formData.operation_no}
                onChange={handleChange}
                required
              />
            </div>

            {/* Activity */}
            <div className={`${styles.formGroupActivity} ${styles.formGroup}`}>
              <label htmlFor="activity" className={styles.formLabel}>
                Activity
              </label>
              <select
                id="activity"
                className={`${styles.formSelect} ${styles.labelSelectActivity}`}
                value={formData.activity}
                onChange={handleChange}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือก Activity
                </option>
                <option className={styles.labelOption} value="Daily Check">
                  Daily Check
                </option>
                <option className={styles.labelOption} value="Deep Cleaning">
                  Deep Cleaning
                </option>
              </select>
            </div>

            {/* ประเภท Tag */}
            <div className={`${styles.formGroupTagType} ${styles.formGroup}`}>
              <label htmlFor="tag_type" className={styles.formLabel}>
                ประเภท Tag
              </label>
              <select
                id="tag_type"
                className={`${styles.formSelect} ${styles.labelSelectTagType}`}
                value={formData.tag_type}
                onChange={handleChange}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือก Tag
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

            {/* C Tag */}
            {showTagLevel === "Challenge" && (
              <div
                className={`${styles.formGroupChallenge} ${styles.formGroup}`}
              >
                <label htmlFor="ctag_level" className={styles.formLabel}>
                  Tag Level
                </label>
                <select
                  id="ctag_level"
                  className={`${styles.formSelect} ${styles.labelSelectTagLevelDetail}`}
                  value={formData.ctag_level}
                  onChange={handleChange}
                >
                  <option
                    className={`${styles.labelOption} ${styles.placeholderOption}`}
                    value=""
                  >
                    เลือก Tag Level
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

            {/* ประเภทปัญหา */}
            <div
              className={`${styles.formGroupProblemType} ${styles.formGroup}`}
            >
              <label htmlFor="problem_type" className={styles.formLabel}>
                ประเภทปัญหา
              </label>
              <select
                id="problem_type"
                className={`${styles.formSelect} ${styles.labelSelectProblemType}`}
                value={formData.problem_type}
                onChange={handleChange}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือกประเภทปัญหา
                </option>
                <option className={styles.labelOption} value="Fault item">
                  Fault item
                </option>
                <option className={styles.labelOption} value="Komarigoto">
                  Komarigoto
                </option>
              </select>
            </div>

            {/* แสดงฟอร์ม Komarigoto */}
            {showKomarigoto === "Komarigoto" && (
              <div
                className={`${styles.formGroupKomarigotoDetail} ${styles.formGroup}`}
              >
                <label htmlFor="komarigoto" className={styles.formLabel}>
                  Komarikoto
                </label>
                <select
                  id="komarigoto"
                  className={`${styles.formSelect} ${styles.labelSelectKomarigotoDetail}`}
                  value={formData.komarigoto}
                  onChange={handleChange}
                >
                  <option
                    className={`${styles.labelOption} ${styles.placeholderOption}`}
                    value=""
                  >
                    เลือก Komarigoto
                  </option>
                  <option className={styles.labelOption} value="ตรวจสอบยาก">
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

            {/* หัวข้อปัญหา */}
            <div
              className={`${styles.formGroupProblemTitle} ${styles.formGroup}`}
            >
              <label htmlFor="problem_topic" className={styles.formLabel}>
                หัวข้อปัญหา
              </label>
              <textarea
                id="problem_topic"
                className={styles.formTextarea}
                value={formData.problem_topic}
                onChange={handleChange}
              />
            </div>

            {/* แนวทางการแก้ปัญหา */}
            <div className={`${styles.formGroupSolution} ${styles.formGroup}`}>
              <label htmlFor="counter_measure" className={styles.formLabel}>
                แนวทางการแก้ปัญหา
              </label>
              <textarea
                id="counter_measure"
                className={styles.formTextarea}
                value={formData.counter_measure}
                onChange={handleChange}
              />
            </div>

            {/* ผู้แจ้งปัญหา */}
            <div className={`${styles.formGroupReporter} ${styles.formGroup}`}>
              <label htmlFor="created_by" className={styles.formLabel}>
                <span className={styles.signStarReporter}>*</span> ผู้แจ้งปัญหา
              </label>
              <input
                type="text"
                id="created_by"
                className={styles.formInput}
                value={formData.created_by}
                onChange={handleChange}
                required
              />
            </div>

            {/* กะทำงาน */}
            <div className={`${styles.formGroupShift} ${styles.formGroup}`}>
              <label htmlFor="shift" className={styles.formLabel}>
                กะทำงาน
              </label>
              <select
                id="shift"
                className={`${styles.formSelect} ${styles.labelSelectShift}`}
                value={formData.shift}
                onChange={handleChange}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือกกะทำงาน
                </option>
                <option className={styles.labelOption} value="1">
                  W
                </option>
                <option className={styles.labelOption} value="2">
                  Y
                </option>
              </select>
            </div>

            {/* ประเภทผู้รับผิดชอบ */}
            <div
              className={`${styles.formGroupResponsibleType} ${styles.formGroup}`}
            >
              <label htmlFor="group_pic" className={styles.formLabel}>
                ประเภทผู้รับผิดชอบ
              </label>
              <input
                type="text"
                id="group_pic"
                className={styles.formInput}
                value={formData.group_pic}
                onChange={handleChange}
              />
            </div>

            {/* ผู้แก้ไขปัญหา */}
            <div className={`${styles.formGroupResolver} ${styles.formGroup}`}>
              <label htmlFor="editor_pic" className={styles.formLabel}>
                ผู้แก้ไขปัญหา
              </label>
              <input
                type="text"
                id="editor_pic"
                className={styles.formInput}
                value={formData.editor_pic}
                onChange={handleChange}
              />
            </div>

            {/* วันที่กำหนดเสร็จ */}
            <div className={`${styles.formaGroupEndDate} ${styles.formGroup}`}>
              <label htmlFor="end_date" className={styles.formLabel}>
                วันที่กำหนดเสร็จ
              </label>
              <input
                type="date"
                id="end_date"
                className={styles.formInput}
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>

            {/* วันที่แจ้งปัญหา */}
            <div
              className={`${styles.formGroupReceiveDate} ${styles.formGroup}`}
            >
              <label htmlFor="start_date" className={styles.formLabel}>
                วันที่แจ้งปัญหา
              </label>
              <input
                type="date"
                id="start_date"
                className={styles.formInput}
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>

            {/* วันที่เสร็จ */}
            <div
              className={`${styles.formGroupFinishDate} ${styles.formGroup}`}
            >
              <label htmlFor="finish_date" className={styles.formLabel}>
                วันที่เสร็จ
              </label>
              <input
                type="date"
                id="finish_date"
                className={styles.formInput}
                value={formData.finish_date}
                onChange={handleChange}
              />
            </div>

            {/* จำนวนรูปและ Icon กล้อง */}
            <div className={`${styles.imageInfo} ${styles.formGroup}`}>
              <span className="imageText">จำนวนรูปทั้งหมด : 0 รูป</span>
              <FontAwesomeIcon
                className={styles.cameraIcon}
                icon={faCamera}
                size="2x"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddData;
