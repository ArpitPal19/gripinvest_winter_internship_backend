
import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth Routes", () => {
  test("Signup should fail with weak password", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      first_name: "Test",
      email: "weak@example.com",
      password: "123"
    });
    expect(res.statusCode).toBe(400);
  });

  test("Signup should succeed with strong password", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "StrongPass1!"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("john@example.com");
  });

  test("Login should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "WrongPass"
    });
    expect(res.statusCode).toBe(401);
  });

  test("Login should succeed with correct password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "StrongPass1!"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Accessing profile without token should fail", async () => {
    const res = await request(app).get("/api/auth/profile");
    expect(res.statusCode).toBe(401);
  });

  test("Profile should be accessible with valid token", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "StrongPass1!"
    });
    const token = login.body.token;

    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`); // ✅ proper Bearer usage
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("john@example.com");
  });
});
