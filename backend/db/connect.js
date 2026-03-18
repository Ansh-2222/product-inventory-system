import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then((client) => {
    console.log("PostgreSQL Connected ");
    client.release();
  })
  .catch((err) => {
    console.error("Database connection error :", err);
  });

export default pool;