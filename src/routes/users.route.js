import express from "express";
import {
  createuser,
  deleteuser,
  getAllusers,
  getuser,
} from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { uploadphoto } from "../utils/multer.js";
import { uploadphotomidd } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(uploadphoto, uploadphotomidd, createuser)
  .get(getAllusers);
router.route("/:id").get(getuser).delete(adminOnly, deleteuser);

export default router;
