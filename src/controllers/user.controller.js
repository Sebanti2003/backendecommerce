import multer from "multer";
import User from "../models/user.model.js";
import AppError from "../utils/Error.js";
export const createuser = async (req, res, next) => {
  try {
    const { name, email, password, gender, photo, dob, role = "user" } = req.body;
    const userdata = {
      name: name.trim(),
      email: email.trim(),
      password,
      gender,
      dob,
      role,
    };
    console.log(photo);
    
    if (photo && photo.trim() !== "") {
      userdata.photo = photo;
    }
    const user = await User.findOne({
      $or: [{ email: userdata.email }, { name: userdata.name }],
    });
    if (user) {
      return res.json({
        status: true,
        message: "User already exists",
        user,
      });
    } else {
      const newuser = await User.create(userdata);

      return res
        .status(200)
        .json({ newuser, status: 200, message: `Welcome ${newuser.name}` });
    }
  } catch (error) {
    return next(new AppError(error.message, 500, error));
  }
};
export const getAllusers = async function (req, res, next) {
  try {
    const users = await User.find().select(
      "-password -createdAt -updatedAt -__v -isAdmin"
    );
    return res.json({
      Total: users.length,
      status: 200,
      success: true,
      message: "Information about all the users",
      data: users,
    });
  } catch (error) {
    return next(new AppError(error.message, 500, error));
  }
};

export const getuser = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "-password -createdAt -updatedAt -__v"
    );
    return res.json({
      status: 200,
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500, error));
  }
};
export const deleteuser = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.json({ status: 404, message: "User not found" });
    }
    return res.json({
      status: 200,
      success: true,
      message: "User deleted Successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500, error));
  }
};
