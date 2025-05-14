import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import profile from "../controller/profile.controller.js"
import validateUser from "../middleware/validateUser.middleware.js"
import userDetail from "../controller/userDetail.controller.js"
import getUserDetails from "../controller/getUserDetails.controller.js";


const router = Router()

router.route("/profile-pic").post(validateUser,upload.single("file"),profile)
router.route("/user-detail").post(validateUser,(req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.error("❌ Multer error:", err);
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }
      next();
    });
  },userDetail)
router.route("/get-user-detail").get(validateUser,getUserDetails)

export default router