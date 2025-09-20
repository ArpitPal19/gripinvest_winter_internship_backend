
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const InvestmentProduct = sequelize.define(
  "InvestmentProduct",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    investment_type: { type: DataTypes.ENUM("bond", "fd", "mf", "etf", "other"), allowNull: false },
    tenure_months: { type: DataTypes.INTEGER, allowNull: false },
    annual_yield: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    risk_level: { type: DataTypes.ENUM("low", "moderate", "high"), allowNull: false },
    min_investment: { type: DataTypes.DECIMAL(12, 2), defaultValue: 1000.0 },
    max_investment: { type: DataTypes.DECIMAL(12, 2) },
    description: { type: DataTypes.TEXT },
  },
  { tableName: "investment_products", timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

export default InvestmentProduct;
