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

  // สำหรับแสดงและซ่อนฟอร์ม Komarigoto และ Challenge
  const [ShowKomarigoto, setShowKomarigoto] = useState("");
  const [ShowTagLevel, setShowTagLevel] = useState("");

  // สำหรับดึงข้อมูลในตาราง master_mc_g6m ในการเช็คข้อมูล
  const [getlineTitleData, setLineTitleData] = useState([]);

  // ใช้สำหรับการเก็บข้อมูลใน INPUT เพื่อนำไป Insert ใน DATABASE POSTGRES

  // State สำหรับ form
  const [formData, setFormData] = useState({
    line: "",
    machineNo: "",
    opNo: "",
    activity: "",
    tagType: "",
    cTagType: "",
    problemType: "",
    korimagoto: "",
    problemTopic: "",
    counterMeasure: "",
    createdBy: "",
    shift: "",
    groupPIC: "",
    editorPIC: "",
    receiveDate: "",
    startDate: "",
    finishDate: "",
    endDate: "",
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
        machineNo: "",
        opNo: "",
        activity: "",
        tagType: "",
        cTagType: "",
        problemType: "",
        korimagoto: "",
        problemTopic: "",
        counterMeasure: "",
        createdBy: "",
        shift: "",
        groupPIC: "",
        editorPIC: "",
        receiveDate: "",
        startDate: "",
        finishDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  // เรียกข้อมูล API ของ master_mc_g6m
  useEffect(() => {
    axios
      .get("http://localhost:4000/master_mc_g6m/line_title_g6_main")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setData(response.data);
        setLineTitleData(response.data);
      })
      .catch((error) => {
        console.error("เกิดปัญในการเรียกใช้ข้อมูล:", error);
      });
  }, []);

  // ทำให้ receiveDate มีค่าเท่ากับ startDate
  useEffect(() => {
    if (formData.startDate) {
      setFormData((prevData) => ({
        ...prevData,
        receiveDate: prevData.startDate,
      }));
    }
  }, [formData.startDate]);

  // เมื่อเลือก machineNo ให้ทำการตรวจสอบว่า line_title ตรงกับเครื่องที่เลือกหรือไม่
  useEffect(() => {
    if (formData.machineNo) {
      const lineData = getlineTitleData.find(
        (item) => item.line_name === formData.machineNo
      );
      setFormData((prevData) => ({
        ...prevData,
        line: lineData ? lineData.line_title : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, line: "" }));
    }
  }, [formData.machineNo, getlineTitleData]);

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
              <label htmlFor="machineNo" className={styles.formLabel}>
                Machine No.
              </label>
              <select
                id="machineNo"
                className={`${styles.formSelect} ${styles.labelSelectMachineNo}`}
                value={formData.machineNo}
                onChange={handleChange}
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
              <label htmlFor="opNo" className={styles.formLabel}>
                OP No.
              </label>
              <input
                type="text"
                id="opNo"
                className={styles.formInput}
                value={formData.opNo}
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
              <label htmlFor="tagType" className={styles.formLabel}>
                ประเภท Tag
              </label>
              <select
                id="tagType"
                className={`${styles.formSelect} ${styles.labelSelectTagType}`}
                value={formData.tagType}
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
            {ShowTagLevel === "Challenge" && (
              <div
                className={`${styles.formGroupChallenge} ${styles.formGroup}`}
              >
                <label htmlFor="tagLevelDetail" className={styles.formLabel}>
                  Tag Level
                </label>
                <select
                  id="tagLevelDetail"
                  className={`${styles.formSelect} ${styles.labelSelectTagLevelDetail}`}
                  value={formData.cTagType}
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
              <label htmlFor="problemType" className={styles.formLabel}>
                ประเภทปัญหา
              </label>
              <select
                id="problemType"
                className={`${styles.formSelect} ${styles.labelSelectProblemType}`}
                value={formData.problemType}
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
            {ShowKomarigoto === "Komarigoto" && (
              <div
                className={`${styles.formGroupKomarigotoDetail} ${styles.formGroup}`}
              >
                <label htmlFor="komarigotoDetail" className={styles.formLabel}>
                  Komarikoto
                </label>
                <select
                  id="komarigotoDetail"
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
              <label htmlFor="problemTopic" className={styles.formLabel}>
                หัวข้อปัญหา
              </label>
              <textarea
                id="problemTopic"
                className={styles.formTextarea}
                value={formData.problemTopic}
                onChange={handleChange}
              />
            </div>

            {/* แนวทางการแก้ปัญหา */}
            <div className={`${styles.formGroupSolution} ${styles.formGroup}`}>
              <label htmlFor="counterMeasure" className={styles.formLabel}>
                แนวทางการแก้ปัญหา
              </label>
              <textarea
                id="counterMeasure"
                className={styles.formTextarea}
                value={formData.counterMeasure}
                onChange={handleChange}
              />
            </div>

            {/* ผู้แจ้งปัญหา */}
            <div className={`${styles.formGroupReporter} ${styles.formGroup}`}>
              <label htmlFor="createdBy" className={styles.formLabel}>
                <span className={styles.signStarReporter}>*</span> ผู้แจ้งปัญหา
              </label>
              <input
                type="text"
                id="createdBy"
                className={styles.formInput}
                value={formData.createdBy}
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
              <label htmlFor="groupPIC" className={styles.formLabel}>
                ประเภทผู้รับผิดชอบ
              </label>
              <input
                type="text"
                id="groupPIC"
                className={styles.formInput}
                value={formData.groupPIC}
                onChange={handleChange}
              />
            </div>

            {/* ผู้แก้ไขปัญหา */}
            <div className={`${styles.formGroupResolver} ${styles.formGroup}`}>
              <label htmlFor="editorPIC" className={styles.formLabel}>
                ผู้แก้ไขปัญหา
              </label>
              <input
                type="text"
                id="editorPIC"
                className={styles.formInput}
                value={formData.editorPIC}
                onChange={handleChange}
              />
            </div>

            {/* วันที่กำหนดเสร็จ */}
            <div className={`${styles.formaGroupEndDate} ${styles.formGroup}`}>
              <label htmlFor="endDate" className={styles.formLabel}>
                วันที่กำหนดเสร็จ
              </label>
              <input
                type="date"
                id="endDate"
                className={styles.formInput}
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            {/* วันที่แจ้งปัญหา */}
            <div
              className={`${styles.formGroupReceiveDate} ${styles.formGroup}`}
            >
              <label htmlFor="startDate" className={styles.formLabel}>
                วันที่แจ้งปัญหา
              </label>
              <input
                type="date"
                id="startDate"
                className={styles.formInput}
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            {/* วันที่เสร็จ */}
            <div
              className={`${styles.formGroupFinishDate} ${styles.formGroup}`}
            >
              <label htmlFor="finishDate" className={styles.formLabel}>
                วันที่เสร็จ
              </label>
              <input
                type="date"
                id="finishDate"
                className={styles.formInput}
                value={formData.finishDate}
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
