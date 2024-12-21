/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";
import styles from "./dropdownsubHeader.module.css";

const DropdownsubHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // ใช้เก็บ dropdown ที่เปิด
  const dropdownRefs = useRef([]); // สร้าง refs สำหรับแต่ละ dropdown
  const [isRotatedTagType, setIsRotatedTagtype] = useState(false);
  const [isRotatedStatusType, setIsRotatedStatusType] = useState(false);
  const [isRotatedShift, setIsRotatedShift] = useState(false);

  const handleClickArrowTagType = () => {
    setIsRotatedTagtype((prev) => !prev);
  };

  const handleClickArrowStatusType = () => {
    setIsRotatedStatusType((prev) => !prev);
  };

  const handleClickArrowShift = () => {
    setIsRotatedShift((prev) => !prev);
  };

  // เปิด/ปิด dropdown
  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  // ใช้ useEffect เพื่อฟังการคลิกภายนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setActiveDropdown(null); // ปิด dropdown เมื่อคลิกภายนอก
        setIsRotatedTagtype(false);
        setIsRotatedStatusType(false);
        setIsRotatedShift(false);
      }
    };

    document.addEventListener("click", handleClickOutside); // ฟังการคลิก
    return () => {
      document.removeEventListener("click", handleClickOutside); // ลบการฟังเมื่อ unmount
    };
  }, []);

  return (
    <>
      {/* Dropdown ที่ 1 */}
      <div
        className={styles.dropdown}
        ref={(el) => (dropdownRefs.current[0] = el)}
      >
        <button
          onClick={() => {
            toggleDropdown(0);
            handleClickArrowTagType();
          }}
        >
          Tag Type{" "}
          <span
            className={`${styles.dropdownArrowTagtype} ${
              isRotatedTagType ? styles.rotated : ""
            }`}
          >
            ▼
          </span>
        </button>
        {activeDropdown === 0 && (
          <div className={`${styles.dropdownContent} ${styles.show}`}>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        )}
      </div>

      {/* Dropdown ที่ 2 */}
      <div
        className={styles.dropdown}
        ref={(el) => (dropdownRefs.current[1] = el)}
      >
        <button
          onClick={() => {
            toggleDropdown(1);
            handleClickArrowStatusType();
          }}
        >
          Status Type{" "}
          <span
            className={`${styles.dropdownArrowStatusType} ${
              isRotatedStatusType ? styles.rotated : ""
            }`}
          >
            ▼
          </span>
        </button>
        {activeDropdown === 1 && (
          <div className={`${styles.dropdownContent} ${styles.show}`}>
            <a href="#">Link A</a>
            <a href="#">Link B</a>
            <a href="#">Link C</a>
          </div>
        )}
      </div>

      {/* Dropdown ที่ 3 */}
      <div
        className={styles.dropdown}
        ref={(el) => (dropdownRefs.current[2] = el)}
      >
        <button
          onClick={() => {
            toggleDropdown(2);
            handleClickArrowShift();
          }}
        >
          Shift{" "}
          <span
            className={`${styles.dropdownArrowShift} ${
              isRotatedShift ? styles.rotated : ""
            }`}
          >
            ▼
          </span>
        </button>
        {activeDropdown === 2 && (
          <div className={`${styles.dropdownContent} ${styles.show}`}>
            <a href="#">Item 1</a>
            <a href="#">Item 2</a>
            <a href="#">Item 3</a>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownsubHeader;
