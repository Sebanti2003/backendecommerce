//name photo price stock category
import mongoose from "mongoose";
const productDBconnection = mongoose.createConnection(process.env.MONGO_URL, {
  dbName: "productDB",
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the name of the product"],
    },
    photo: { type: String, required: [true, "Please enter photo"] },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please enter the category"],
    },
  },
  {
    timestamps: true,
  }
);
export const Product = productDBconnection.model("Product", productSchema);
