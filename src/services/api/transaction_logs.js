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

// SELECT: เรียกข้อมูลด้วย ID
// Route สำหรับดึงข้อมูลด้วย id
router.get("/:id", async (req, res) => {
  const { id } = req.params; // รับค่า id จาก URL
  try {
    const result = await client.query(
      `SELECT * FROM transaction_logs WHERE id = $1`,
      [id] // ส่งค่า id เป็นพารามิเตอร์
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการ" });
    }
    res.json(result.rows[0]); // ส่งข้อมูลแถวเดียวกลับไป
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// INSERT: เพิ่มข้อมูลใหม่
router.post("/InsertTransaction", async (req, res) => {
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
    ];

    const result = await client.query(query, values);
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด!");
  }
});

// UPDATE: อัปเดตข้อมูล
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
