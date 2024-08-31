import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
const couponDBconnection = mongoose.createConnection(process.env.MONGO_URL, {
  dbName: "couponDB",
});
export const couponschema = new mongoose.Schema({
  coupon: {
    type: String,
    required: [true, "Please enter the coupon Code"],
    trim: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, "Please enter the Discount Amount"],
  },
});

export const Coupon = couponDBconnection.model("Coupon", couponschema);
