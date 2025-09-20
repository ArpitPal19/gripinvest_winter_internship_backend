
import TransactionLog from "../models/TransactionLog.js";

export default function loggerMiddleware(req, res, next) {
  res.on("finish", async () => {
    try {
      await TransactionLog.create({
        endpoint: req.originalUrl,
        http_method: req.method,
        status_code: res.statusCode,
        user_id: req.user ? req.user.id : null,
        email: req.user ? req.user.email : null,
        error_message: res.statusCode >= 400 ? res.locals.errorMessage || null : null,
      });
    } catch (err) {
      console.error("⚠️ Failed to log transaction:", err.message);
    }
  });
  next();
}
