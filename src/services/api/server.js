const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const router = express();
const port = process.env.PORT;

// Import routes
const transactions_logs = require("./transaction_logs");
const linename_g6 = require("./linename_g6");
const machine_list = require("./machine_list");
const master_mc_g6m = require("./master_mc_g6m");
const mc_list_model = require("./mc_list_model");

// เชื่อมต่อกับ PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("เชื่อมต่อฐานข้อมูล Postgres สำเร็จ!"))
  .catch((err) => console.error("เกิดเชื่อมต่อเกิดข้อผิดพลาด", err.stack));

// ใช้ CORS เพื่อให้สามารถใช้ API ข้าม Ports ได้
router.use(cors());
router.use(express.json());

// หน้า Hello เอาไว้ TEST ตัว API
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// ใช้ routes ตัว API ต่างๆ
router.use("/transaction_logs", transactions_logs);
router.use("/linename_g6", linename_g6);
router.use("/machine_list", machine_list);
router.use("/master_mc_g6m", master_mc_g6m);
router.use("/mc_list_model", mc_list_model);

// เริ่มเซิร์ฟเวอร์
router.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
