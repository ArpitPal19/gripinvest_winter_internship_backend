
export function checkPasswordStrength(password) {
  if (!password) return "weak";
  if (password.length < 6) return "weak";
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return "strong";
  }
  return "moderate";
}

export function generateProductDescription(product) {
  return `An investment product of type ${product.investment_type}, 
  offering an annual yield of ${product.annual_yield}% 
  for a tenure of ${product.tenure_months} months. 
  Risk level is ${product.risk_level}.`;
}

export function analyzePortfolio(investments) {
  const byType = {};
  const byRisk = { low: 0, moderate: 0, high: 0 };

  investments.forEach((inv) => {
    const product = inv.InvestmentProduct;
    if (!product) return;
    byType[product.investment_type] = (byType[product.investment_type] || 0) + 1;
    byRisk[product.risk_level]++;
  });

  return {
    diversification: byType,
    risk_balance: byRisk,
    advice:
      investments.length < 3
        ? "Consider diversifying more products."
        : "Portfolio is reasonably diversified.",
  };
}
