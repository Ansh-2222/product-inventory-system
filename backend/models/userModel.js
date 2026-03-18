import pool from "../db/connect.js";

export const createUser = async (
  name,
  email,
  passwordHash,
  emailVerified = false,
  phoneVerified = false
) => {

  const result = await pool.query(
    `INSERT INTO users
    (name, email, password_hash, email_verified, phone_verified)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [name, email, passwordHash, emailVerified, phoneVerified]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  return result.rows[0];
};

export const findUserByVerificationToken = async (token) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email_verification_token=$1",
    [token]
  );

  return result.rows[0];
};

export const verifyUserEmail = async (token) => {

  const result = await pool.query(
    `UPDATE users
     SET email_verified=true,
         email_verification_token=NULL
     WHERE email_verification_token=$1
     RETURNING *`,
    [token]
  );

  return result.rows[0];
};