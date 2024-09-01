import express from "express";
import {
  dashboardstat,
  getbarcharts,
  getlinecharts,
  getpiecharts,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/stat").get(dashboardstat);
router.route("/pie").get(getpiecharts);
router.route("/bar").get(getbarcharts);
router.route("/line").get(getlinecharts);

export default router;
