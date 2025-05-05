import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import blogPost from "../controller/blogPost.controller.js";
import validateUser from "../middleware/validateUser.middleware.js"
import blogList from "../controller/blogList.controller.js";
import blogDetail from "../controller/blogDetail.controller.js";

const router = Router()

router.route("/blog-post").post(validateUser,upload.single("file"),blogPost)
router.route("/blog-list").get(blogList)
router.route("/blogId/:_id").get(blogDetail)


export default router