
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Investment from "../models/Investment.js";
import InvestmentProduct from "../models/InvestmentProduct.js";
import { analyzePortfolio } from "../utils/aiHelper.js";

const router = express.Router();

// Invest
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { product_id, amount } = req.body;
    const product = await InvestmentProduct.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (amount < product.min_investment) return res.status(400).json({ error: "Below minimum" });
    if (product.max_investment && amount > product.max_investment)
      return res.status(400).json({ error: "Exceeds maximum" });

    const expected_return = (amount * (product.annual_yield / 100) * product.tenure_months) / 12;
    const maturity_date = new Date();
    maturity_date.setMonth(maturity_date.getMonth() + product.tenure_months);

    const investment = await Investment.create({
      user_id: req.user.id,
      product_id,
      amount,
      expected_return,
      maturity_date,
    });

    res.status(201).json({ investment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Portfolio
router.get("/portfolio", authMiddleware, async (req, res) => {
  const investments = await Investment.findAll({
    where: { user_id: req.user.id },
    include: [{ model: InvestmentProduct }],
  });

  const insights = analyzePortfolio(investments);
  res.json({ investments, insights });
});

export default router;
