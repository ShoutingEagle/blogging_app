import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import blogPost from "../controller/blogPost.controller.js";
import validateUser from "../middleware/validateUser.middleware.js"
import blogList from "../controller/blogList.controller.js";

const router = Router()

router.route("/blog-post").post(validateUser,upload.single("file"),blogPost)
router.route("/blog-list").get(blogList)


export default router