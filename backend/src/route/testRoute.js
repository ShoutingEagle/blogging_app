import { Router } from "express";
import testController from "../controller/testController.js";

const router = Router()


router.route("/test-route").get(testController)

export default router