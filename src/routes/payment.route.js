import express from "express";
import {
  allCoupons,
  applydiscount,
  deleteCoupon,
  newcoupon,
  stripepaymentintegration,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/coupon/new").post(newcoupon);

router.route("/applyDiscount").post(applydiscount);

router.route("/stripe/payment").post(stripepaymentintegration);

router.route("/allCoupons").get(allCoupons);

router.route("/deletecoupon/:couponID").delete(deleteCoupon);

export default router;
