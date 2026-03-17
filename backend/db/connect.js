import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.connect()
  .then((client) => {
    console.log("PostgreSQL Connected");
    client.release(); // important
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default pool;