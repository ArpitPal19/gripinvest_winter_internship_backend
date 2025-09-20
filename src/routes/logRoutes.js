
import express from "express";
import TransactionLog from "../models/TransactionLog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All logs (admin only)
router.get("/", authMiddleware, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: "Admin only" });
  const logs = await TransactionLog.findAll({ order: [["created_at", "DESC"]] });
  res.json({ logs });
});

// Logs for user
router.get("/user/:id", authMiddleware, async (req, res) => {
  if (!req.user.is_admin && req.user.id !== req.params.id)
    return res.status(403).json({ error: "Forbidden" });

  const logs = await TransactionLog.findAll({
    where: { user_id: req.params.id },
    order: [["created_at", "DESC"]],
  });
  res.json({ logs });
});

export default router;
