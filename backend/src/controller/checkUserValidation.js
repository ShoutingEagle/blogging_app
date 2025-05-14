import userModel from "../model/userSchema.model.js";
import ApiResponse from "../util/ApiResponse.js";
import asyncHandler from "../util/asyncHandler.js";

const checkUserValidation = asyncHandler(async(req,res) => {
    const {_id} = req.user

    const response = await userModel.findById(_id)
    if(!response) {
        res
        .status(400)
        .json(new ApiResponse(400,{},"no user found"))
    }

     return res
    .status(200)
    .json(new ApiResponse(200, {}, "User is authenticated"));
})

export default checkUserValidation