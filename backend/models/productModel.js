import pool from "../db/connect.js";

export const createProduct = async (
  name,
  category,
  price,
  quantity,
  description,
  userId
) => {
  const result = await pool.query(
    `INSERT INTO products 
    (name, category, price, quantity, description, user_id)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [name, category, price, quantity, description, userId]
  );

  return result.rows[0];
};

export const getProductsByUser = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE user_id=$1 ORDER BY created_at DESC",
    [userId]
  );

  return result.rows;
};

export const getProductById = async (id, userId) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1 AND user_id=$2",
    [id, userId]
  );

  return result.rows[0];
};

export const updateProduct = async (
  id,
  name,
  category,
  price,
  quantity,
  description,
  userId
) => {
  const result = await pool.query(
    `UPDATE products
     SET name=$1, category=$2, price=$3, quantity=$4, description=$5
     WHERE id=$6 AND user_id=$7
     RETURNING *`,
    [name, category, price, quantity, description, id, userId]
  );

  return result.rows[0];
};

export const deleteProduct = async (id, userId) => {
  await pool.query(
    "DELETE FROM products WHERE id=$1 AND user_id=$2",
    [id, userId]
  );
};