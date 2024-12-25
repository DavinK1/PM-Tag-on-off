import React, { useState, useEffect } from "react";
import styles from "./EditData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditData = () => {
  return (
    <div className={styles.container}>
      {/* Section 1 */}
      <div className={styles.section}>
        <h5 className={styles.title}>ส่วนที่ 1: รายละเอียดปัญหา</h5>
        <div className={styles.row}>
          <div className={styles.col}>
            <p>
              <strong>Tag แจ้งปัญหา:</strong> ตัวอย่าง
            </p>
            <p>
              <strong>No.:</strong> 12345
            </p>
            <p>
              <strong>วันที่พบ:</strong> 2024-12-25
            </p>
            <p>
              <strong>Line:</strong> Line 1
            </p>
          </div>
          <div className={styles.col}>
            <p>
              <strong>ชื่อผู้แจ้ง:</strong> นายสมชาย
            </p>
            <p>
              <strong>ประเภท:</strong> ความปลอดภัย
            </p>
            <p>
              <strong>รายละเอียด:</strong> มีปัญหาเกิดขึ้น...
            </p>
            <p>
              <strong>รูปภาพปัญหา:</strong>{" "}
              <span className={styles.imagePlaceholder}>[รูปภาพ]</span>
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.section}>
        <h5 className={styles.title}>ส่วนที่ 2: การจัดการปัญหา</h5>
        <div className={styles.row}>
          <div className={styles.col}>
            <p>
              <strong>วันที่รับเรื่อง:</strong> 2024-12-26
            </p>
            <p>
              <strong>แผนการแก้ไข:</strong> ตรวจสอบและแก้ไข
            </p>
          </div>
          <div className={styles.col}>
            <p>
              <strong>เสร็จ:</strong> ไม่
            </p>
            <p>
              <strong>ผู้แก้ไข:</strong> นาย A
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={`${styles.section} ${styles.section3}`}>
        <div className={styles.block}>
          <p>
            <strong>GL Prod</strong>
          </p>
          <div className={styles.imagePlaceholder}>[รูปภาพ]</div>
          <p>วันที่: 2024-12-25</p>
        </div>
        <div className={styles.block}>
          <p>
            <strong>GL MT</strong>
          </p>
          <div className={styles.imagePlaceholder}>[รูปภาพ]</div>
          <p>วันที่: 2024-12-26</p>
        </div>
        <div className={styles.block}>
          <p>
            <strong>Text แสดง</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditData;
