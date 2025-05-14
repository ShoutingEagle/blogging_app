import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import profile from "../controller/profile.controller.js"
import validateUser from "../middleware/validateUser.middleware.js"
import userDetail from "../controller/userDetail.controller.js"
import getUserDetails from "../controller/getUserDetails.controller.js";


const router = Router()

router.route("/profile-pic").post(validateUser,upload.single("file"),profile)
router.route("/user-detail").post(validateUser,upload.single("file"),userDetail)
router.route("/get-user-detail").get(validateUser,getUserDetails)

export default router