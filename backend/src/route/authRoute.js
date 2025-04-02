import { Router } from "express"
import userAuth from "../controller/userAuth.controller.js"
import generateOtp from "../controller/generateOtp.controller.js"

const router = Router()

router.route("/userAuth-generateOtp").post(generateOtp)
router.route("/userAuth-auth").post(userAuth)

export default router