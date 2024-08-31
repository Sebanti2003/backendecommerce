import mongoose from "mongoose";
import User, { userdbconnection, userSchema } from "./user.model.js";
import { configDotenv } from "dotenv";
configDotenv();
const orderdbconnection = mongoose.createConnection(process.env.MONGO_URL, {
  dbName: "orderDB",
});
orderdbconnection.model("User",userSchema);
const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      required: true,
      default:0
    },
    discount: {
      type: Number,
      required: true,
      default:0
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered"],
    },
    orderItems: [
      {
        _id: false,
        name: String,
        price: Number,
        quantity: Number,
        photo: String,
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Order = orderdbconnection.model("Order", orderSchema);
