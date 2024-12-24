const express = require("express");
const { Client } = require("pg");
const router = express();

// เชื่อมต่อกับ PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("เชื่อมต่อฐานข้อมูล Postgres สำเร็จ"))
  .catch((err) => console.error("เกิดเชื่อมต่อเกิดข้อผิดพลาด : ", err.stack));

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM linename_g6;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

module.exports = router;
