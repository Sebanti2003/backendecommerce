import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/Error.js";
import { reducestock } from "../utils/reducestocks.js";

export const neworder = async function (req, res, next) {
  try {
    const {
      shippingInfo,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      totalAmount,
      orderStatus,
      orderItems,
      deliveredAt = new Date(),
    } = req.body;
    if (
      !shippingInfo ||
      !user ||
      !subtotal ||
      !tax ||
      !shippingCharges ||
      !discount ||
      !totalAmount ||
      !orderStatus ||
      !orderItems
    ) {
      return next(new AppError("Please provide all the required fields", 400));
    }
    await reducestock(orderItems);
    const order = await Order.create({
      shippingInfo,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      totalAmount,
      orderStatus,
      orderItems,
      deliveredAt,
    });
    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(
      new AppError(error.message || "Error in creating the order", 400, error)
    );
  }
};
export const myOrders = async function (req, res, next) {
  try {
    const { id } = req.params;
    
    // Fetch orders with populated user field
    const orders = await Order.find({ user: id }).populate('user');

    // Check if orders were found
    if (orders.length === 0) {
      return next(new AppError("No orders found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(new AppError(error.message, 405, error));
  }
};
export const allorders = async function (req, res, next) {
  try {
    const allorders = await Order.find({});
    res.status(200).json({
      status: "success",
      message: "All orders fetched successfully",
      data: allorders,
    });
  } catch (error) {
    next(new AppError(error.message, 405, error));
  }
};
