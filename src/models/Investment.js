
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import InvestmentProduct from "./InvestmentProduct.js";

const Investment = sequelize.define(
  "Investment",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    product_id: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    invested_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM("active", "matured", "cancelled"), defaultValue: "active" },
    expected_return: { type: DataTypes.DECIMAL(12, 2) },
    maturity_date: { type: DataTypes.DATE },
  },
  { tableName: "investments", timestamps: false }
);

Investment.belongsTo(User, { foreignKey: "user_id" });
Investment.belongsTo(InvestmentProduct, { foreignKey: "product_id" });

export default Investment;
