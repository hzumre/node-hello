const express = require('express');
const http = require('http');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

const dbConnection = mysql.createConnection({
  host: 'lab-db.crc60yuwczt8.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'GSQ2Dar9MMRG7fyullod',
  database: 'students'
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to the database.');
});

app.get("/student", (req, res) => {
  dbConnection.query("SELECT * FROM student", (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
      res.status(500).json({
        status: "error",
        message: "An error occurred while fetching student."
      });
    } else {
      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  });
});

const bodyParser = require('body-parser');

// JSON gövdelerini işlemek için body-parser kullanımı
app.use(bodyParser.json());

// POST isteğini işlemek için endpoint
app.post("/student/add", (req, res) => {
  const ad = req.body.ad;
  const surname = req.body.surname;

  const sql = "INSERT INTO student (ad, surname) VALUES (?, ?)";
  dbConnection.query(sql, [ad, surname], (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
      res.status(500).json({
        status: "error",
        message: "An error occurred while adding the student."
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Student added successfully."
      });
    }
  });
});
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on localhost:${port}/`);
});


