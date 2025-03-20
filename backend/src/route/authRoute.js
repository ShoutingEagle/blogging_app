import { Router } from "express"
import userAuth from "../controller/userAuth.controller.js"

const router = Router()

router.route("/userAuth").post(userAuth)

export default router