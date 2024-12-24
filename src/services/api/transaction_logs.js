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
    const result = await client.query(`
      SELECT 
        id,
        machine_no,
        operation_no,
        line,
        activity,
        tag_type,
        ctag_level,
        problem_type,
        komarigoto,
        problem_topic,
        counter_measure,
        shift,
        group_pic,
        editor_pic,
        TO_CHAR(receive_Date, 'DD/MM/YY') AS receive_date,
        start_date,
        finish_date,
        end_date,
        gl_mt2,
        gl_prod2,
        attachment,
        test,
        cal_status,
        date_mtsign,
        date_prosign,
        created_by
      FROM transaction_logs;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

module.exports = router;
