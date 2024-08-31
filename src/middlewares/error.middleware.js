import { configDotenv } from "dotenv";

configDotenv();
export const errorcontroller = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (err.error?.name == "CastError") {
      return res.status(400).json({
        status: "failed",
        message: `Invalid ID ${err.error.path}->${err.error.value}`,
      });
    }
    if (err.error?.code == 11000) {
      return res.status(400).json({
        status: "failed",
        message: "Duplicate entry",
      });
    }
  }
  if (err.error && err.error?.name === "JsonWebTokenError") {
    err.message = err.error.message;
    err.error = err.error?.name;
  }
  if (err.error && err.error?.name === "TokenExpiredError") {
    err.message = "Your Token has been expired. Renew the token and then try";
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Internal server error";
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Some error is there",
    error: err.error,
  });
};
