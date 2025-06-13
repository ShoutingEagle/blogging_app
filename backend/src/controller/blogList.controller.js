import asyncHandler from "../util/asyncHandler.js"
import blogModel from "../model/blogSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"


const blogList = asyncHandler(async(req,res) => {
    const {tag="all",lastId=null,limit=10} = req.body
    const filter = tag==="all"?{}:{category:tag}
    if(lastId) filter._id = {$gt: lastId}

    const blogs = await blogModel
    .find(filter)
    .populate("owner","username profile_pic")
    .sort({createdAt : -1})
    .limit(limit)

    if(!blogs) throw new ApiError(500,"No list found")

    const nextCursor = blogList.length === limit ? blogList[blogList.length-1]._id : null
 
    res.status(201).json(
        new ApiResponse(
        200,
        {blogs,nextCursor}
    ))
})

export default blogList