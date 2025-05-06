import commentModel from "../model/commentSchema.js"
import ApiResponse from "../util/ApiResponse.js"
import asyncHandler from "../util/asyncHandler.js"

const postComment = asyncHandler(async(req,res) => {
    const blogRef = req.params.blogId
    const {comment,parentCommentRef} = req.body
    const commentedUserRef = req.user._id


    console.log(blogRef,comment,parentCommentRef,commentedUserRef)

    // Validate blogId
    if (!blogRef ) {
        throw new ApiError(400, "BlogId is required");
    }

    // Validate userId
    if (!commentedUserRef ) {
        throw new ApiError(401, "UserId is required");
    }

    // Validate comment
    if (!comment.trim()) {
        throw new ApiError(400, "Comment is required ");
    }



    const commentResponse = await commentModel.create({
        comment,
        blogRef,
        parentCommentRef,
        commentedUserRef
    })

    res.status(201).json(new ApiResponse(201,commentResponse,"comment successfully posted"))
})

export default postComment