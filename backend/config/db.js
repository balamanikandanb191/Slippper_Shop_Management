require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connection = pool;

pool.getConnection((err, conn) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("DB Connected Successfully");
    // Run DB Migrations
    const runMigration = require("./migrate");
    runMigration();
    conn.release();
  }
});

module.exports = connection;