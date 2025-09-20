
import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let adminToken, userToken, userId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const admin = await User.create({
    first_name: "Admin",
    email: "admin@logs.com",
    password_hash: await bcrypt.hash("AdminPass1!", 10),
    is_admin: true
  });

  adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || "secret");

  const user = await User.create({
    first_name: "Normal",
    email: "user@logs.com",
    password_hash: await bcrypt.hash("UserPass1!", 10),
    is_admin: false
  });

  userId = user.id;
  userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");
});

afterAll(async () => {
  await sequelize.close();
});

describe("Log Routes", () => {
  test("Admin can view all logs", async () => {
    const res = await request(app)
      .get("/api/logs")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.logs)).toBe(true);
  });

  test("User can view their own logs", async () => {
    const res = await request(app)
      .get(`/api/logs/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
  });
  afterAll(async () => {
  await sequelize.close();
});

});
