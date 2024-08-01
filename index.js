import express from "express";
import mysql from "mysql2";

const app = express();
const port = 9000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "edutor",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed: " + err);
  } else {
    console.log("MYSQL-DB Connected Successfully!");
  }
});

app.get("/", (req, res) => {
  res.send("Hello! from test-node");
});

app.get("/app-version", (req, res) => {
  db.query("SELECT version FROM app_versions LIMIT 1", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred" });
    }

    res.json({ version: results[0].version });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
