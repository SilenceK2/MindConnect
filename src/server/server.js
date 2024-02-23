const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.PORT || 8000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mindapp",
});

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT * FROM connecter";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // 전체 데이터를 클라이언트에 JSON 형식으로 응답
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
