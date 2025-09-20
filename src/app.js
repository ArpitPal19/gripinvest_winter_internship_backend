
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import logRoutes from "./routes/logRoutes.js";

// Middleware
import loggerMiddleware from "./middleware/loggerMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/logs", logRoutes);

// Health check
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", db: "not connected", message: err.message });
  }
});

export default app;
