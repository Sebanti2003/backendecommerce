import express from 'express'
import { newcoupon } from '../controllers/payment.controller.js'

const router = express.Router()

router.route('/coupon/new').post(newcoupon);

export default router