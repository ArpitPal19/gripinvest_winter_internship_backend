
import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import InvestmentProduct from "../src/models/InvestmentProduct.js";

let userToken, productId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create user
  const user = await User.create({
    first_name: "Investor",
    last_name: "User",
    email: "investor@test.com",
    password_hash: await bcrypt.hash("UserPass1!", 10)
  });

  userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

  // Create product
  const product = await InvestmentProduct.create({
    name: "Test Bond",
    investment_type: "bond",
    tenure_months: 12,
    annual_yield: 8,
    risk_level: "moderate",
    min_investment: 1000
  });

  productId = product.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Investment Routes", () => {
  test("User can invest in product", async () => {
    const res = await request(app)
      .post("/api/investments")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ product_id: productId, amount: 2000 });

    expect(res.statusCode).toBe(201);
    expect(Number(res.body.investment.amount)).toBe(2000);
  });

  test("User can view portfolio", async () => {
    const res = await request(app)
      .get("/api/investments/portfolio")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.investments.length).toBeGreaterThan(0);
    expect(res.body.insights).toHaveProperty("risk_balance");
  });

  test("Reject investment below minimum", async () => {
  const res = await request(app)
    .post("/api/investments")
    .set("Authorization", `Bearer ${userToken}`)
    .send({ product_id: productId, amount: 100 }); // too low
  expect(res.statusCode).toBe(400);
});

  afterAll(async () => {
  await sequelize.close();
});

});
