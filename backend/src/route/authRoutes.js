import { Router } from "express"
import userAuth from "../controller/userAuth.controller.js"
import generateOtp from "../controller/generateOtp.controller.js"
import checkAuth from "../controller/checkAuth.controller.js"



const router = Router()

router.route("/userAuth-generateOtp").post(generateOtp)
router.route("/userAuth-auth").post(userAuth)
router.route("/check-auth").get(checkAuth)

export default router