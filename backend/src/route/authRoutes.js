import { Router } from "express"
import userAuth from "../controller/userAuth.controller.js"
import generateOtp from "../controller/generateOtp.controller.js"
import checkAuth from "../controller/checkAuth.controller.js"
import logout from "../controller/logout.controller.js"
import validateUser from "../middleware/validateUser.middleware.js"



const router = Router()

router.route("/userAuth-generateOtp").post(generateOtp)
router.route("/userAuth-auth").post(userAuth) 
router.route("/check-auth").get(checkAuth)
router.route("/logout").get(validateUser,logout) 

export default router