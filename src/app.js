import cors from "cors";
import express from "express";
import userrouter from "../src/routes/users.route.js";
import productRouter from "../src/routes/products.route.js";
import orderrouter from "../src/routes/order.route.js";
import paymentrouter from "../src/routes/payment.route.js";
import dashboardRouter from "../src/routes/Dashboardstat.js";
import { errorcontroller } from "./middlewares/error.middleware.js";
import AppError from "./utils/Error.js";
import NodeCache from "node-cache";
import morgan from "morgan";
const app = express();
export const myCache = new NodeCache({
  stdTTL: 600,
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api/v1/users", userrouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderrouter);
app.use("/api/v1/payments", paymentrouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.get("*", (req, res, next) => {
  return next(new AppError(`${req.url} does not exist`, 404));
});
app.use(errorcontroller);
export default app;
