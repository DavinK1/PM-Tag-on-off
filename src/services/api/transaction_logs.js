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

// SELECT: เรียกข้อมูล
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
        TO_CHAR(receive_Date, 'YYYY-MM-DD') AS receive_date,
        TO_CHAR(start_Date, 'YYYY-MM-DD') AS start_date,
        TO_CHAR(finish_Date, 'YYYY-MM-DD') AS finish_date,
        TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date,
        gl_mt2,
        gl_prod2,
        attachment,
        test,
        cal_status,
        TO_CHAR(date_mtsign, 'YYYY-MM-DD') AS date_mtsign,
        TO_CHAR(date_prosign, 'YYYY-MM-DD') AS date_prosign,
        created_by
      FROM transaction_logs;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// SELECT: เรียกข้อมูลด้วย ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
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
        TO_CHAR(start_Date, 'DD/MM/YY') AS start_date,
        TO_CHAR(finish_Date, 'DD/MM/YY') AS finish_date,
        TO_CHAR(end_Date, 'DD/MM/YY') AS end_date,
        gl_mt2,
        gl_prod2,
        attachment,
        test,
        cal_status,
        TO_CHAR(date_mtsign, 'DD/MM/YY') AS date_mtsign,
        TO_CHAR(date_prosign, 'DD/MM/YY') AS date_prosign,
        created_by
      FROM transaction_logs
      WHERE id = $1;
    `,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }
    res.json(result.rows[0]); // ส่งข้อมูลเป็นอาร์เรย์
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// INSERT: เพิ่มข้อมูลใหม่
router.post("/inserttransaction_logs", async (req, res) => {
  const {
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
    receive_date,
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
    created_by,
  } = req.body;

  // Validate ตัว Machine_no
  if (!machine_no) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลรหัสเครื่องจักร!" });
  }

  // Validate ตัว Machine_no
  if (!created_by) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลผู้แจ้งปัญหา!" });
  }

  try {
    const query = `
      INSERT INTO transaction_logs (
        machine_no, operation_no, line, activity, tag_type, ctag_level, problem_type,
        komarigoto, problem_topic, counter_measure, shift, group_pic, editor_pic, 
        receive_date, start_date, finish_date, end_date, gl_mt2, gl_prod2, 
        attachment, test, cal_status, date_mtsign, date_prosign, created_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
        $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
      ) RETURNING *;
    `;
    const formatDate = (date) => {
      if (date && date.trim() !== "") {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.toISOString().split("T")[0].replace(/-/g, "/");
        } else {
          return null;
        }
      }
      return null;
    };
    const values = [
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
      formatDate(receive_date),
      formatDate(start_date),
      formatDate(finish_date),
      formatDate(end_date),
      gl_mt2,
      gl_prod2,
      attachment,
      test,
      cal_status,
      formatDate(date_mtsign),
      formatDate(date_prosign),
      created_by,
    ];

    const result = await client.query(query, values);
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ", data: result.rows[0] });
  } catch (err) {
    console.error("ฐานข้อมูเกิดข้อผิดพลาด:", err);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดขณะส่งข้อมูล โปรดลองใหม่อีกครั้ง",
      error: err.message,
    });
  }
});

// UPDATE: อัปเดตข้อมูล
router.put("/updatetransaction_logs/:id", async (req, res) => {
  const { id } = req.params;
  const {
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
    receive_date,
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
    created_by,
  } = req.body;

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  try {
    const query = `
      UPDATE transaction_logs SET
        machine_no = $1, operation_no = $2, line = $3, activity = $4, tag_type = $5,
        ctag_level = $6, problem_type = $7, komarigoto = $8, problem_topic = $9,
        counter_measure = $10, shift = $11, group_pic = $12, editor_pic = $13,
        receive_date = $14, start_date = $15, finish_date = $16, end_date = $17,
        gl_mt2 = $18, gl_prod2 = $19, attachment = $20, test = $21, cal_status = $22,
        date_mtsign = $23, date_prosign = $24, created_by = $25
      WHERE id = $26
      RETURNING *;
    `;
    const values = [
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
      formatDate(receive_date), // Format date before passing to SQL
      formatDate(start_date),
      formatDate(finish_date),
      formatDate(end_date),
      gl_mt2,
      gl_prod2,
      attachment,
      test,
      cal_status,
      formatDate(date_mtsign),
      formatDate(date_prosign),
      created_by,
      id,
    ];

    const result = await client.query(query, values);
    res
      .status(200)
      .json({ message: "อัปเดตข้อมูลสำเร็จ", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// DELETE: ลบข้อมูล
router.delete("/deletetransaction_logs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM transaction_logs WHERE id = $1 RETURNING *;";
    const result = await client.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("ไม่พบข้อมูลที่ต้องการลบ!");
    }

    res.status(200).json({ message: "ลบข้อมูลสำเร็จ", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

module.exports = router;
