
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./src/config/db.js";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    await sequelize.sync();
    const [user, created] = await User.findOrCreate({
      where: { email: process.env.ADMIN_EMAIL },
      defaults: {
        first_name: "Admin",
        last_name: "User",
        email: process.env.ADMIN_EMAIL,
        password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin123", 10),
        is_admin: true
      }
    });
    console.log("✅ Admin user ready:", user.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
