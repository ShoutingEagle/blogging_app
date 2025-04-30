import asyncHandler from "../util/asyncHandler.js"
import blogModel from "../model/blogSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"
import assetModel from "../model/assetSchema.model.js"

const blogList = asyncHandler(async(req,res) => {
    const bloglists = await blogModel.find()
    if(!bloglists) throw new ApiError(500,"No list found")
    

    res.status(201).json(new ApiResponse(
        200,
        bloglists
    ))
})

export default blogList