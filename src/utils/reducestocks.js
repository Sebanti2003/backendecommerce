import { Product } from "../models/product.model.js";

export const reducestock = async function (orderItems) {
    for (const element of orderItems) {
      const product = await Product.findById(element.productID);
      if (!product) {
        return res.status(400).json({
          status: "fail",
          message: "Product not found",
        });
      }
      if (product.stock < element.quantity) {
        return res.status(400).json({
          status: "fail",
          message: "Insufficient stock",
        });
      }
      product.stock = product.stock - element.quantity;
      await product.save();
    }
  };