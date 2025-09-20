
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    risk_appetite: { type: DataTypes.ENUM("low", "moderate", "high"), defaultValue: "moderate" },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "users", timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

export default User;
