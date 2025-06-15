import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import blogPost from "../controller/blogPost.controller.js";
import validateUser from "../middleware/validateUser.middleware.js"
import blogList from "../controller/blogList.controller.js";
import blogDetail from "../controller/blogDetail.controller.js";
import comments from "../controller/comment.controller.js";
import postComment from "../controller/postComment.controller.js";
import testController from "../controller/testController.js";
import latestReviews from "../controller/latestReviews.js";


const router = Router()

// router.route("/blog-post").post(testController)
router.route("/blog-post").post(validateUser,upload.single("file"),blogPost)
router.route("/blog-list").post(blogList)
router.route("/latest-reviews").get(latestReviews)
router.route("/blogId/:_id").get(blogDetail)


router.route("/get-comments/:blogId").get(comments)
router.route("/post-comment/:blogId").post(validateUser,postComment)


export default router