import AppError from "../utils/Error.js";
import User from "../models/user.model.js";
export const adminOnly = async function (req, res, next) {
  try {
    const { id } = req.query;
    console.log(String(id));
    if (!id) {
      return next(new AppError("saale query provide kar pehele", 401));
    }
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Saale Fake ID use kar ta hain", 404));
    }
    if (user.role !== "admin") {
      return next(
        new AppError("Admin he nehi hain tu ..you are not a admin", 401)
      );
    }
    next();
  } catch (error) {
    next(new AppError("The person is not a admin", 401));
  }
};
