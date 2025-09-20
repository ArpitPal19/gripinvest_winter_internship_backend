
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TransactionLog = sequelize.define(
  "TransactionLog",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    endpoint: { type: DataTypes.STRING, allowNull: false },
    http_method: { type: DataTypes.ENUM("GET", "POST", "PUT", "DELETE"), allowNull: false },
    status_code: { type: DataTypes.INTEGER, allowNull: false },
    error_message: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "transaction_logs", timestamps: false }
);

export default TransactionLog;
