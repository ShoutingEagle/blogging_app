import blogModel from "../model/blogSchema.model.js"
import userModel from "../model/userSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"
import asyncHandler from "../util/asyncHandler.js"

const getUserDetails = asyncHandler(async(req,res) => {
    const {_id} = req.user
    const userDetails = await userModel.findById(req.user._id).select("-refreshToken -createdAt -updatedAt -email -_id")

    if(!userDetails) throw new ApiError(500,"something went wrong")

    const blogs = await blogModel
        .find({owner:_id})
        .select("title category article article_image createdAt updatedAt")
        .sort({createdAt: -1})

    if(!blogs) blogs = "no blogs found"
    
    const responseData = {
        userDetails,
        blogs
    }

    return res
    .status(200)
    .json(new ApiResponse(200,responseData,"data successfully fetched"))
})

export default getUserDetails