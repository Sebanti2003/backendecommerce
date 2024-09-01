import { Coupon } from "../models/coupon.model.js";
import AppError from "../utils/Error.js";

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
    next(new AppError(error.message || "error happened", 400, error));
  }
};
export const applydiscount = async function (req, res, next) {
  try {
    const { coupon } = req.query;
    if (!coupon) {
      return next(new AppError("Please provide coupon code", 400));
    }
    const couponData = await Coupon.findOne({ coupon });
    if (!couponData) {
      return next(new AppError("Invalid Coupon Code", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Coupon applied successfully",
      discountAmount: couponData.amount,
    });
  } catch (error) {
    next(
      new AppError(error.message || "Discount Coupon Not Working", 400, error)
    );
  }
};
export const allCoupons = async function (req, res, next) {
  try {
    const allCoupons = await Coupon.find({});
    if (!allCoupons) {
      return next(new AppError("No coupons found", 404));
    }
    return res.status(200).json({
      status: "success",
      message: "All coupons fetched successfully",
      allCoupons,
    });
  } catch (error) {
    next(
      new AppError(error.message || "Fetching of coupons failed", 400, error)
    );
  }
};
export const deleteCoupon = async function (req, res, next) {
  try {
    const { couponID } = req.params;
    const deletecoupon = await Coupon.findByIdAndDelete(couponID);
    if (!deletecoupon) {
      return next(new AppError("Invalid coupon ID", 404));
    }
    return res.status(200).json({
      status: "success",
      message: "Coupon deleted successfully",
      data: deletecoupon,
    });
  } catch (error) {
    next(new AppError(error.message || "Coupon deletion failed", 400, error));
  }
};
