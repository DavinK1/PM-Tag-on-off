import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./TakePhoto.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCameraRotate } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const TakePhoto = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentStream, setCurrentStream] = useState(null);
  const [currentDeviceId, setCurrentDeviceId] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true); // สถานะกล้องหน้า

  useEffect(() => {
    const initCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        // เลือกกล้องตาม label (front หรือ rear)
        const frontCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("front")
        );
        const rearCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear")
        );

        const selectedDevice = isFrontCamera
          ? frontCamera || videoDevices[0]
          : rearCamera || videoDevices[0];

        if (selectedDevice) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedDevice.deviceId },
          });

          setCurrentStream(stream);
          setCurrentDeviceId(selectedDevice.deviceId);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "ตรวจไม่พบอุปกรณ์",
            text: "กรุณาตรวจสอบว่าคุณได้เปิดใช้งานกล้องหรือไม่",
            confirmButtonText: "ตกลง",
          });
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเข้าถึงกล้องได้ โปรดลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    };

    initCamera();

    return () => {
      if (currentStream) {
        const tracks = currentStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isFrontCamera]); // เปลี่ยนกล้องเมื่อ isFrontCamera เปลี่ยน

  const getImageName = (imageCount) => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const current_time = currentDate
      .toLocaleTimeString()
      .replace(/:/g, "")
      .split(" ")[0]; // เวลาปัจจุบันในรูปแบบ hhmmss

    // สร้างชื่อไฟล์
    return `image${imageCount}_${day}${month}${year}_${current_time}`;
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();

    const imageName = getImageName(images.length + 1); // ตั้งชื่อภาพโดยใช้จำนวนภาพที่ถ่ายแล้ว
    console.log("Image Name:", imageName); // แสดงชื่อภาพใน console

    setImages((prevImages) => [
      ...prevImages,
      { name: imageName, image: dataUrl },
    ]);
  };

  const switchCamera = async () => {
    // สลับสถานะของกล้องหน้า/หลัง
    setIsFrontCamera((prevState) => !prevState);
  };

  const handleBack = () => {
    navigate(-1); // กลับไปหน้าก่อนหน้า
  };

  const handleRefresh = () => {
    navigate(0);
  };

  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.gridheader}>
          <div className={styles.gridHeaderItem1}>
            <button
              className={styles.gridHeaderButton}
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faCircleLeft} size="2x" />
            </button>
          </div>
          <div className={styles.gridHeaderItem2}>
            <p>สำหรับถ่ายภาพปัญหา</p>
          </div>
        </div>
      </header>
      <div className={styles.takePhotoContainer}>
        <main className={styles.takePhotoMain}>
          {/* ปุ่ม Toggle สำหรับสลับกล้อง */}
          <div className={styles.toggleContainer}>
            <FontAwesomeIcon icon={faCameraRotate} size="2x" />
            <span>{isFrontCamera ? "กล้องหน้า" : "กล้องหลัง"}</span>
            <div
              className={`${styles.toggleSwitch} ${
                isFrontCamera ? styles.frontBackground : styles.rearBackground
              }`}
              onClick={switchCamera}
            >
              <div
                className={`${styles.toggleKnob} ${
                  isFrontCamera ? styles.front : styles.rear
                }`}
              ></div>
            </div>
          </div>

          <div className={styles.videoContainer}>
            <video ref={videoRef} autoPlay></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>

          <div className={styles.takeActionCameraButton}>
            <button className={styles.takePhotoButton} onClick={takePhoto}>
              ถ่ายภาพ <FontAwesomeIcon icon={faCamera} size="2x" />
            </button>
          </div>
        </main>

        {/* สำหรับแสดงรูปภาพ */}
        {images.length > 0 && (
          <div className={styles.photoPreview}>
            <h2>รูปภาพที่ถ่ายทั้งหมด: {images.length} รูป</h2>
            <div className={styles.imageGallery}>
              {images.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <span className={styles.imageNumber}>{index + 1}</span>
                  <img src={image.image} alt={`Captured ${index + 1}`} />
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteImage(index)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {images.length > 0 && (
          <div className={styles.submitButtonContainer}>
            <button className={styles.submitButton}>
              บันทึก <FontAwesomeIcon icon={faFloppyDisk} size="2x" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakePhoto;
