
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { checkPasswordStrength } from "../utils/aiHelper.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !email || !password) {
      return res.status(400).json({ error: "first_name, email, and password required" });
    }

    const strength = checkPasswordStrength(password);
    if (strength === "weak") {
      return res.status(400).json({ error: "Password too weak" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name, last_name, email, password_hash: hashed });

    res.json({ message: "User created", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    first_name: req.user.first_name,
    is_admin: req.user.is_admin,
  });
});

export default router;
