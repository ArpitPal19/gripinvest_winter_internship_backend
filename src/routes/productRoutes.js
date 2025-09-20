
import express from "express";
import InvestmentProduct from "../models/InvestmentProduct.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateProductDescription } from "../utils/aiHelper.js";

const router = express.Router();

// List all products
router.get("/", async (req, res) => {
  try {
    const products = await InvestmentProduct.findAll();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await InvestmentProduct.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({ product });
});

// Create product (Admin)
router.post("/", authMiddleware, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: "Admin only" });
  if (!req.body.description) req.body.description = generateProductDescription(req.body);

  try {
    const product = await InvestmentProduct.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put("/:id", authMiddleware, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: "Admin only" });

  const product = await InvestmentProduct.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });

  await product.update(req.body);
  res.json({ product });
});

// Delete product
router.delete("/:id", authMiddleware, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: "Admin only" });

  const product = await InvestmentProduct.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });

  await product.destroy();
  res.json({ message: "Deleted" });
});

export default router;
