// dbConnect.js
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config({ path: "../../" });

const router = express.Router();

// ตั้งค่าการเชื่อมต่อ PostgreSQL โดยใช้ค่าจาก .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// API Endpoint สำหรับดึงข้อมูลจากฐานข้อมูล
router.get("/services/api/dbConnect", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transaction"); // เปลี่ยน SQL query ตามต้องการ
    res.json(result.rows); // ส่งข้อมูลกลับในรูปแบบ JSON
  } catch (error) {
    console.error("เกิดปัญหาในการ Query ข้อมูล", error);
    res.status(500).send("เกิดปัญหาเกี่ยวกับเซิร์ฟเวอร์");
  }
});

module.exports = router;
