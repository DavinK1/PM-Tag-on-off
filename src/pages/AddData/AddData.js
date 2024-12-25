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
  const [getLine, setGetLine] = useState("");
  const [getMachineNo, setGetMachineNo] = useState("");
  const [getOpNo, setGetOpNo] = useState("");
  const [getActivity, setGetActivity] = useState("");
  const [getTagType, setGetTagType] = useState("");
  const [getCTagType, setGetCTagType] = useState("");
  const [getProblemType, setGetProblemType] = useState("");
  const [getKorimagoto, setGetKorimagoto] = useState("");
  const [getProblemTopic, setGetProblemTopic] = useState("");
  const [getCouterMeasure, setGetCouterMeasure] = useState("");
  const [getShift, setGetShift] = useState("");
  const [getGroupPIC, setGetGroupPIC] = useState("");
  const [geteditorPIC, setGeteditorPIC] = useState("");
  const [getReceiveDate, setGetReceiveDate] = useState("");
  const [getStartDate, setGetStartDate] = useState("");
  const [getFinishDate, setGetFinishDate] = useState("");
  const [getEndDate, setGetEndDate] = useState("");
  const [getGlMT2, setGetGlMT2] = useState("");
  const [getglProd2, setGetglProd2] = useState("");
  const [getAttachment, setGetAttachment] = useState("");
  const [getTest, setGetTest] = useState("");
  const [getCalStatus, setGetCalStatus] = useState("");
  const [getDateMTsign, setGetDateMTsign] = useState("");
  const [getDatePROsign, setGetDatePROsign] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     line,
  //     machineNo,
  //     opNo,
  //     activity,
  //     tagType,
  //     problemType,
  //     problemTitle,
  //     solution,
  //     reporter,
  //     shift,
  //     responsibleType,
  //     resolver,
  //     endDate,
  //     receiveDate,
  //     finishDate,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/insertData",
  //       formData
  //     );
  //     alert("Data submitted successfully");
  //     // Handle success response (clear form or navigate)
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     alert("Error submitting data");
  //   }
  // };

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

  // เมื่อเลือก machineNo ให้ทำการตรวจสอบว่า line_title ตรงกับเครื่องที่เลือกหรือไม่
  useEffect(() => {
    if (getMachineNo) {
      const lineData = getlineTitleData.find(
        (item) => item.line_name === getMachineNo
      );
      if (lineData) {
        setGetLine(lineData.line_title); // ตั้งค่า Line title จาก machineNo ที่เลือก
      } else {
        setGetLine(""); // รีเซ็ตหากไม่พบข้อมูลที่ตรงกัน
      }
    }
  }, [getMachineNo, getlineTitleData]);

  const handleMachineNoChange = (e) => {
    setGetMachineNo(e.target.value); // เมื่อเลือก machineNo ใหม่
  };

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
              onClick={() => navigate("/")}
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
                value={getLine}
                onChange={(e) => setGetLine(e.target.value)}
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
                value={getMachineNo}
                onChange={handleMachineNoChange}
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
              <input type="text" id="opNo" className={styles.formInput} />
            </div>

            {/* Activity */}
            <div className={`${styles.formGroupActivity} ${styles.formGroup}`}>
              <label htmlFor="activity" className={styles.formLabel}>
                Activity
              </label>
              <select
                id="activity"
                className={`${styles.formSelect} ${styles.labelSelectActivity}`}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือก Activity
                </option>
                <option className={styles.labelOption} value="1">
                  Daily Check
                </option>
                <option className={styles.labelOption} value="2">
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
                value={ShowTagLevel}
                onChange={(e) => setShowTagLevel(e.target.value)}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือก Tag
                </option>
                <option className={styles.labelOption} value="1">
                  WHITE
                </option>
                <option className={styles.labelOption} value="2">
                  RED
                </option>
                <option className={styles.labelOption} value="3">
                  Challenge
                </option>
              </select>
            </div>

            {/* แสดงฟอร์ม Challenge */}
            {ShowTagLevel === "3" && (
              <div
                className={`${styles.formGroupChallenge} ${styles.formGroup}`}
              >
                <label htmlFor="tagLevelDetail" className={styles.formLabel}>
                  Tag Level
                </label>
                <select
                  id="tagLevelDetail"
                  className={`${styles.formSelect} ${styles.labelSelectTagLevelDetail}`}
                >
                  <option
                    className={`${styles.labelOption} ${styles.placeholderOption}`}
                    value=""
                  >
                    เลือก Tag Level
                  </option>
                  <option className={styles.labelOption} value="1">
                    A
                  </option>
                  <option className={styles.labelOption} value="2">
                    B
                  </option>
                  <option className={styles.labelOption} value="3">
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
                value={ShowKomarigoto}
                onChange={(e) => setShowKomarigoto(e.target.value)}
              >
                <option
                  className={`${styles.labelOption} ${styles.placeholderOption}`}
                  value=""
                >
                  เลือกประเภทปัญหา
                </option>
                <option className={styles.labelOption} value="1">
                  Fault item
                </option>
                <option className={styles.labelOption} value="2">
                  Komarigoto
                </option>
              </select>
            </div>

            {/* แสดงฟอร์ม Komarigoto */}
            {ShowKomarigoto === "2" && (
              <div
                className={`${styles.formGroupKomarigotoDetail} ${styles.formGroup}`}
              >
                <label htmlFor="komarigotoDetail" className={styles.formLabel}>
                  Komarikoto
                </label>
                <select
                  id="komarigotoDetail"
                  className={`${styles.formSelect} ${styles.labelSelectKomarigotoDetail}`}
                >
                  <option
                    className={`${styles.labelOption} ${styles.placeholderOption}`}
                    value=""
                  >
                    เลือก Komarigoto
                  </option>
                  <option className={styles.labelOption} value="1">
                    ตรวจสอบยาก
                  </option>
                  <option className={styles.labelOption} value="2">
                    4S ยาก
                  </option>
                  <option className={styles.labelOption} value="3">
                    ทำงานยาก
                  </option>
                </select>
              </div>
            )}

            {/* หัวข้อปัญหา */}
            <div
              className={`${styles.formGroupProblemTitle} ${styles.formGroup}`}
            >
              <label htmlFor="problemTitle" className={styles.formLabel}>
                หัวข้อปัญหา
              </label>
              <textarea
                id="problemTitle"
                className={styles.formTextarea}
                value={getProblemTopic}
                onChange={(e) => setGetProblemTopic(e.target.value)}
              />
            </div>

            {/* แนวทางการแก้ปัญหา */}
            <div className={`${styles.formGroupSolution} ${styles.formGroup}`}>
              <label htmlFor="solution" className={styles.formLabel}>
                แนวทางการแก้ปัญหา
              </label>
              <textarea id="solution" className={styles.formTextarea} />
            </div>

            {/* ผู้แจ้งปัญหา */}
            <div className={`${styles.formGroupReporter} ${styles.formGroup}`}>
              <label htmlFor="reporter" className={styles.formLabel}>
                <span className={styles.signStarReporter}>*</span> ผู้แจ้งปัญหา
              </label>
              <input type="text" id="reporter" className={styles.formInput} />
            </div>

            {/* กะทำงาน */}
            <div className={`${styles.formGroupShift} ${styles.formGroup}`}>
              <label htmlFor="shift" className={styles.formLabel}>
                กะทำงาน
              </label>
              <select
                id="shift"
                className={`${styles.formSelect} ${styles.labelSelectShift}`}
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
              <label htmlFor="responsibleType" className={styles.formLabel}>
                ประเภทผู้รับผิดชอบ
              </label>
              <input
                type="text"
                id="responsibleType"
                className={styles.formInput}
              />
            </div>

            {/* ผู้แก้ไขปัญหา */}
            <div className={`${styles.formGroupResolver} ${styles.formGroup}`}>
              <label htmlFor="resolver" className={styles.formLabel}>
                ผู้แก้ไขปัญหา
              </label>
              <input type="text" id="resolver" className={styles.formInput} />
            </div>

            {/* วันที่กำหนดเสร็จ */}
            <div className={`${styles.formaGroupEndDate} ${styles.formGroup}`}>
              <label htmlFor="endDate" className={styles.formLabel}>
                วันที่กำหนดเสร็จ
              </label>
              <input type="date" id="endDate" className={styles.formInput} />
            </div>

            {/* วันที่แจ้งปัญหา */}
            <div
              className={`${styles.formGroupReceiveDate} ${styles.formGroup}`}
            >
              <label htmlFor="receiveDate" className={styles.formLabel}>
                วันที่แจ้งปัญหา
              </label>
              <input
                type="date"
                id="receiveDate"
                className={styles.formInput}
              />
            </div>

            {/* วันที่เสร็จ */}
            <div
              className={`${styles.formGroupFinishDate} ${styles.formGroup}`}
            >
              <label htmlFor="finishDate" className={styles.formLabel}>
                วันที่เสร็จ
              </label>
              <input type="date" id="finishDate" className={styles.formInput} />
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
