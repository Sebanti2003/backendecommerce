import express from "express";
import {
  allorders,
  myOrders,
  neworder,
  processOrder,
  singleorder,
} from "../controllers/order.controller.js";
const router = express.Router();

router.route("/").post(neworder).get(allorders);
router.route("/myorders/:id").get(myOrders);
router.route("/singleOrder/:id").get(singleorder).put(processOrder);

export default router;
