
import { checkPasswordStrength, generateProductDescription, analyzePortfolio } from "../src/utils/aiHelper.js";

describe("AI Helper Functions", () => {
  test("Password strength - weak", () => {
    expect(checkPasswordStrength("123")).toBe("weak");
  });

  test("Password strength - strong", () => {
    expect(checkPasswordStrength("StrongPass1!")).toBe("strong");
  });

  test("Auto product description", () => {
    const desc = generateProductDescription({
      investment_type: "bond",
      annual_yield: 8,
      tenure_months: 12,
      risk_level: "moderate"
    });
    expect(desc).toMatch(/bond/);
    expect(desc).toMatch(/8/);
  });

  test("Portfolio analysis", () => {
    const insights = analyzePortfolio([
      { InvestmentProduct: { investment_type: "bond", risk_level: "low" } },
      { InvestmentProduct: { investment_type: "mf", risk_level: "high" } }
    ]);
    expect(insights).toHaveProperty("diversification");
    expect(insights).toHaveProperty("risk_balance");
  });

});
