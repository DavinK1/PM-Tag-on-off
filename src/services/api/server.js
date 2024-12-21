// server.js
const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
const port = process.env.PORT || 5000;

// ใช้ router ที่สร้างขึ้นใน dbConnect.js
app.use(dbConnect);

// เริ่มต้น API server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
