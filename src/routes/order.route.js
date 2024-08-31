import express from 'express'
import { allorders, myOrders, neworder } from '../controllers/order.controller.js';
const router=express.Router();

router.route("/").post(neworder).get(allorders);
router.route("/myorders/:id").get(myOrders);

export default router;