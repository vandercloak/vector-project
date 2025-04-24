import mysql from "mysql2/promise";

console.log(process.env.DB_HOST);
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "patient_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
