import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import fs from "fs";
configDotenv();

// Configuration
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_KEY_CLOUDINARY_SECRET,
});
// Upload an image to Cloudinary
export const uploadoncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) {
      console.error("No file path provided");
      return null;
    }

    if (!fs.existsSync(localfilepath)) {
      console.error("File does not exist:", localfilepath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: 'auto',
    });

    console.log("File uploaded to Cloudinary:", response.url);
    return response.url;  // Return the URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Ensure local file is deleted if upload fails
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }

    return null;
  }
};
