
import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let adminToken;
let createdProductId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create admin user
  const admin = await User.create({
    first_name: "Admin",
    last_name: "User",
    email: "admin@test.com",
    password_hash: await bcrypt.hash("AdminPass1!", 10),
    is_admin: true
  });

  adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || "secret");
});

afterAll(async () => {
  await sequelize.close();
});

describe("Product Routes", () => {
  test("Non-admin cannot create product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Bond",
        investment_type: "bond",
        tenure_months: 12,
        annual_yield: 7,
        risk_level: "low"
      });
    expect(res.statusCode).toBe(401);
  });

  test("Admin can create product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Corporate Bond",
        investment_type: "bond",
        tenure_months: 12,
        annual_yield: 7,
        risk_level: "low"
      });
    expect(res.statusCode).toBe(201);
    createdProductId = res.body.product.id; // ✅ capture product ID
  });

  test("Can list products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  test("Admin can update product", async () => {
    const res = await request(app)
      .put(`/api/products/${createdProductId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated Bond" });
    expect(res.statusCode).toBe(200);
    expect(res.body.product.name).toBe("Updated Bond");
  });

  test("Admin can delete product", async () => {
    const res = await request(app)
      .delete(`/api/products/${createdProductId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });
});
