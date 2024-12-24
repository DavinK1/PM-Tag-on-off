const { Pool } = require("pg"); // ใช้ pg module สำหรับเชื่อมต่อ PostgreSQL

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

// ฟังก์ชันเชื่อมต่อฐานข้อมูล
const dbConnect = async () => {
  try {
    // ทดสอบการเชื่อมต่อ
    const client = await pool.connect();
    console.log("เชื่อมต่อฐานข้อมูล Postgres สำเร็จ");
    client.release();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล Postgres : ", error);
    throw error;
  }
};

module.exports = dbConnect;