const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");  
const PORT = process.env.PORT || 8000;

app.use(cors()); 
app.use(bodyParser.json()); 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mindapp",
});


app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.get("/connecter", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT * FROM connecter";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.get("/chat", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT * FROM chat";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.post("/input", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { contents, type, connectId } = req.body;
  const sqlQuery = "INSERT INTO chat(connectId, type, contents) VALUES (?, ?, ?)";

  db.query(sqlQuery, [connectId, type, contents], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
