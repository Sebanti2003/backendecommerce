import { Coupon } from "../models/coupon.model.js";

export const newcoupon = async function (req, res, next) {
  try {
    const { amount, coupon } = req.body;
    if (!amount || !coupon) {
      return next(new AppError("Please provide all the required fields", 400));
    }
    const newcoupon = await Coupon.create({ amount, coupon });
    return res.status(201).json({
      status: "success",
      data: newcoupon,
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};
