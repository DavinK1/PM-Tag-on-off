const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

// เชื่อมต่อกับ PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// ใช้ CORS เพื่อให้สามารถใช้ API ข้าม Ports ได้
app.use(cors());

// API ตัวอย่าง
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API สำหรับดึงข้อมูลจากฐานข้อมูล
app.get("/transactions", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM transaction");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
