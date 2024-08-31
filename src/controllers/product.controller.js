import { myCache } from "../app.js";
import { Product } from "../models/product.model.js";
import AppError from "../utils/Error.js";

export const newproduct = async function (req, res, next) {
  try {
    const { name, photo, price, stock, category } = req.body;
    const newprod = {
      name,
      photo,
      price,
      stock,
      category,
    };
    const product = await Product.create(newprod);
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};

export const getlatestproduct = async function (req, res, next) {
  try {
    let product;

    product = await Product.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $limit: 5 },
    ]);
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};

export const getAllcategories = async function (req, res, next) {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};
export const getAdminProducts = async function (req, res, next) {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      status: "success on fetching all products for the admin to see",
      length: products.length,
      data: products,
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed in fetching the products for the admin to see",
        400,
        error
      )
    );
  }
};
export const getSingleProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "product found",
      data: product,
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch the product.Try again!",
        400,
        error
      )
    );
  }
};

export const updateSingleProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const prod = await Product.findById(id);
    if (req.body.stock) {
      req.body.stock += prod.stock;
    }
    const productdetails = req.body;
    const product = await Product.findByIdAndUpdate(id, productdetails, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message || "Product updation failed", 400, error));
  }
};

export const deleteSingleProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message || "Product deletion failed", 400, error));
  }
};
export const getAllProducts = async function (req, res, next) {
  try {
    //filtering

    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));
    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-createdAt -updatedAt -__v");
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) {
        throw new Error("This page does not exist");
      }
    }
    //count the total number of pages

    const pages = (await Product.countDocuments()) / limit;
    const products = await query;

    if (products.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No products found",
      });
    }
    return res.status(200).json({
      status: "success",
      length: products.length,
      data: products,
      numberofpages: Math.ceil(pages),
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};
