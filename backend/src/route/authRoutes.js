import { Router } from "express"
import userAuth from "../controller/userAuth.controller.js"
import generateOtp from "../controller/generateOtp.controller.js"
import checkAuth from "../controller/checkAuth.controller.js"
import logout from "../controller/logout.controller.js"
import validateUser from "../middleware/validateUser.middleware.js"
import checkUserValidation from "../controller/checkUserValidation.js"



const router = Router()

router.route("/userAuth-generateOtp").post(generateOtp)
router.route("/userAuth-auth").post(userAuth) 
router.route("/auth-user").get(validateUser,checkUserValidation) 
router.route("/check-auth").get(checkAuth)
router.route("/validate-user").get(validateUser)
router.route("/logout").get(validateUser,logout) 

export default router