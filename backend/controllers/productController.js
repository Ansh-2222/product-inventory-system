import {
    createProduct,
    getProductsByUser,
    updateProduct,
    deleteProduct
} from "../models/productModel.js";
import pool from "../db/connect.js";

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;

        const product = await createProduct(
            name,
            category,
            price,
            quantity,
            description,
            req.user.id
        );

        res.json(product);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        let query = "SELECT * FROM products WHERE user_id=$1";
        let values = [req.user.id];

        if (search) {
            values.push(`%${search}%`);
            query += ` AND name ILIKE $${values.length}`;
        }

        if (category) {
            values.push(category);
            query += ` AND category=$${values.length}`;
        }

        const result = await pool.query(query, values);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, quantity, description } = req.body;

        const updated = await updateProduct(
            id,
            name,
            category,
            price,
            quantity,
            description,
            req.user.id
        );

        res.json(updated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteProduct(id, req.user.id);

        res.json({ message: "Product deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
