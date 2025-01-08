/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useState, useEffect } from "react";
import styles from "./AddData.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

  // ใช้สำหรับรูปภาพ
  const location = useLocation();
  const { images = [] } = location.state || [];

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
    attachment: "",
  });

  // เมื่อผู้ใช้คลิกที่ไอคอนกล้อง
  const handleCameraClick = () => {
    navigate("/TakePhoto");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // ฟังก์ชันสำหรับ handle การเปลี่ยนแปลงใน form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // เมื่อได้รับข้อมูล images ให้ตั้งค่า attachment เป็นข้อมูลรูปภาพที่ถ่าย
  useEffect(() => {
    if (images && images.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        attachment: images.map((image) => image.image), // เก็บ dataUrl ของรูปภาพทั้งหมดใน attachment
      }));
    }
  }, [images]); // เมื่อ images เปลี่ยนแปลง

  const handleSubmit = async (e) => {
    if (!formData.machine_no) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "กรุณากรอกข้อมูลในช่อง Machine No.",
      });
      return;
    }

    if (!formData.created_by) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "กรุณากรอกข้อมูลในช่อง ผู้แจ้งปัญหา",
      });
      return;
    }

    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/transaction_logs/inserttransaction_logs",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "ข้อมูลถูกเพิ่มเรียบร้อย!",
        confirmButtonColor: "#3085d6",
      });
      // navigate(-1); // หรือไปยังหน้าอื่นที่ต้องการ

      setFormData({
        line: "",
        machine_no: "",
        operation_no: "",
        activity: "",
        tag_type: "",
        problem_type: "",
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
        attachment: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
      const errorMessage = error.response
        ? error.response.data.message || "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์"
        : "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${errorMessage}`,
      });
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

  // ทำให้ receive_date เป็นค่าปัจจุบัน
  useEffect(() => {
    // กำหนดวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, receive_date: currentDate }));
  }, []);

  // เมื่อเลือกเข้ามาที่หน้านี้ให้ Filled ตัว Line ด้วย line_title ที่ fetch มาจาก API http://localhost:4000/master_mc_g6m/line_title_g6_main
  useEffect(() => {
    if (formData.line_title) {
      const initialLineData = lineTitleData.find(
        (item) => item.line_title === formData.line_title
      );
      if (initialLineData) {
        setFormData((prevData) => ({
          ...prevData,
          machine_no: initialLineData.line_name,
        }));
      }
    }
  }, []); // [] ทำให้ effect นี้ทำงานเพียงครั้งเดียวตอนโหลด

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
              onClick={handleGoBack}
              aria-label="กลับไปที่หน้า Page ก่อนหน้า!"
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
                value={"G6-Main"} // กรอกอัตโนมัติจาก formData.line
                onChange={handleChange} // ใช้ในการอัปเดตค่า line หากผู้ใช้แก้ไข
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
            {formData.tag_type === "Challenge" && (
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
            {formData.problem_type === "Komarigoto" && (
              <div
                className={`${styles.formGroupKomarigotoDetail} ${styles.formGroup}`}
              >
                <label htmlFor="komarigoto" className={styles.formLabel}>
                  Komarigoto
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
                className={`${styles.textData} ${styles.formTextarea}`}
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
                className={`${styles.textData} ${styles.formTextarea}`}
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
                <option className={styles.labelOption} value="W">
                  W
                </option>
                <option className={styles.labelOption} value="Y">
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

            {/* สำหรับค่า receive_date (ซ่อนเอาไว้แค่ ส่งแค่ค่า) */}
            <input
              type="hidden"
              id="receive_date"
              value={formData.receive_date}
            />

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
              <span className={styles.ImageText}>
                จำนวนรูปทั้งหมด : {images.length} รูป {/* อัปเดตจำนวนรูปภาพ */}
              </span>
              <FontAwesomeIcon
                id="attachment"
                onClick={handleCameraClick} // เรียกใช้ฟังก์ชันถ่ายภาพเมื่อคลิก
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
