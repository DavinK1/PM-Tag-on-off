const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// การตั้งค่าการเชื่อมต่อ PostgreSQL
const pool = new Pool({
  user: "admin", // Username ดูได้ที่ไฟล์ .env.local
  host: "pm_postgres", // Hostname ดูได้ที่ไฟล์ .env.local
  database: "transaction", // Database ดูได้ที่ไฟล์ .env.local
  password: "admin@STM", // Password ดูได้ที่ไฟล์ .env.local
  port: 5432,
});

// Endpoint สำหรับดึงข้อมูล dbpmtag
router.get("/services/api/dbpmtag", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transaction"); // เปลี่ยน SQL ให้ตรงกับฐานข้อมูล
    res.json(result.rows); // ส่งข้อมูลกลับในรูปแบบ JSON
  } catch (error) {
    console.error("เกิดปัญหาในการเรียกใช้ข้อมูล API:", error);
    res.status(500).send("เกิดปัญหาเซิร์ฟเวอร์");
  }
});

module.exports = router;
