import asyncHandler from "../util/asyncHandler.js"
import commentModel from "../model/commentSchema.js"
import ApiResponse from "../util/ApiResponse.js"

const comments = asyncHandler(async (req, res) => {
    const blogId = req.params.blogId;

    if (!blogId) {
        return res.status(400).json({ success: false, message: "Blog ID is required" });
    }

    const allComments = await commentModel.find({ blogRef: blogId })
        .populate("commentedUserRef", "username profile_pic") // Get username + profile pic
        .populate("parentCommentRef") // Optional: to support nesting or replies
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, allComments, "Comments fetched successfully"));
});

export default comments;
