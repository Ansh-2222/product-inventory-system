import express from "express";
import {
  addProduct,
  getProducts,
  updateProductById,
  deleteProductById,
  getProductById
} from "../controllers/productController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, addProduct);
router.get("/", authenticateUser, getProducts);
router.put("/:id", authenticateUser, updateProductById);
router.delete("/:id", authenticateUser, deleteProductById);
router.get("/:id", authenticateUser, getProductById);

export default router;