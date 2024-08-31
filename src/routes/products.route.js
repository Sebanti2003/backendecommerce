import express from "express";
import {
  deleteSingleProduct,
  getAdminProducts,
  getAllcategories,
  getAllProducts,
  getlatestproduct,
  getSingleProduct,
  newproduct,
  updateSingleProduct,
} from "../controllers/product.controller.js";
import { uploadphoto } from "../utils/multer.js";
import { uploadphotomidd } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.route("/").post(uploadphoto, uploadphotomidd, newproduct);
router.route("/all").get(getAllProducts);
router.route("/latestProducts").get(getlatestproduct);
router.route("/allCategories").get(getAllcategories);
router.route("/adminProducts").get(getAdminProducts);
router
  .route("/getSingleProducts/:id")
  .get(getSingleProduct)
  .patch(uploadphoto, uploadphotomidd, updateSingleProduct)
  .delete(deleteSingleProduct);

export default router;
