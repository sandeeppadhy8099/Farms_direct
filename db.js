<<<<<<< HEAD
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

module.exports = db;
=======
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

module.exports = db;
>>>>>>> 657421e798694f48d230a82f254c87e45b6588ce
