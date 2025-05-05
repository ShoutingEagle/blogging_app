import blogModel from "../model/blogSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"
import asyncHandler from "../util/asyncHandler.js"

const blogDetail = asyncHandler(async(req,res) => {
    const {_id} = req.params
    const article = await blogModel
        .findOne({_id}).populate("owner","_id username profile_pic createdAt")

        if (!article) {
            throw new ApiError(400,"blog does exists")
        }
        

    return res.status(200).json(new ApiResponse(200,article,"success"))
})

export default blogDetail