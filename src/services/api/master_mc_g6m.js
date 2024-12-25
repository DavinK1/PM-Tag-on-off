const express = require("express");
const { Client } = require("pg");
const router = express();

// เชื่อมต่อกับ PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("เชื่อมต่อฐานข้อมูล Postgres สำเร็จ!"))
  .catch((err) => console.error("เกิดเชื่อมต่อเกิดข้อผิดพลาด", err.stack));

// SELECT 1 ข้อมูลมาทั้งหมด
router.get("/all", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM master_mc_g6m;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// SELECT 2 ข้อมูลมาเฉพาะ line_title = G6-Main
router.get("/line_title_g6_main", async (req, res) => {
  try {
    const result = await client.query(`
      SELECT * FROM public.master_mc_g6m
      WHERE line_title = 'G6-Main'
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

module.exports = router;
