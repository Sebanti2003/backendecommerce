import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import validator from "validator";
configDotenv();

const userdbconnection = mongoose.createConnection(process.env.MONGO_URL, {
  dbName: "userDB",
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLease provide the name"],
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "developer"],
      required: [true, "Please provide the role"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
      trim: true,
      required: [true, "Please provide the gender"],
    },
    dob: {
      type: Date,
      trim: true,
      required: [true, "Please provide the date of birth"],
    },
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: [true, "Please provide the email"],
      validate: {
        validator: validator.isEmail,
        message: (x) =>
          `Please provide a valid email,${x} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "PLease provide the password"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("age").get(function () {
  return new Date().getFullYear() - this.dob.getFullYear();
});

const User = userdbconnection.model("User", userSchema);

export default User;
