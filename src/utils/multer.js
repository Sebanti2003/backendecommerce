import multer from "multer";
import User from "../models/user.model.js";
import AppError from "../utils/Error.js";
const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.originalname);
  },
});
const multerfilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image . Please upload only images", 400), false);
  }
};
const upload = multer({
  storage: multerstorage,
  fileFilter: multerfilter,
});
console.log("Entry into the multer part successfull");

export const uploadphoto = upload.single("photo");
