import { uploadoncloudinary } from "../utils/cloudinary.js";
import AppError from "../utils/Error.js";
import fs from "fs";
export const uploadphotomidd = async function (req, res, next) {
  try {
    let localfilepath;
    if (req.file) {
      localfilepath = req.file.path;
      console.log("File uploaded to local path:", localfilepath);

      const cloudinaryurl = await uploadoncloudinary(localfilepath);
      console.log("Cloudinary upload response:", cloudinaryurl);

      if (!cloudinaryurl) {
        if (fs.existsSync(localfilepath)) {
          console.warn("Deleting file due to upload failure:", localfilepath);
        }
        return next(
          new AppError("File not uploaded", 400, { error: "Upload failed" })
        );
      }

      req.body.photo = cloudinaryurl;
      if (fs.existsSync(localfilepath)) {
        console.log(
          "Deleting local file after successful upload:",
          localfilepath
        );
        fs.unlinkSync(localfilepath);
      }else{
        console.log("No local file to delete");
      }
    }
    next();
  } catch (error) {
    console.error("Error uploading photo:", error);
    return next(
      new AppError("Problem at the time of upload of image", 500, error)
    );
  }
};
