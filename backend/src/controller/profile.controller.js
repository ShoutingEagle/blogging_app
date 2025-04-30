import userModel from "../model/userSchema.model.js";
import asyncHandler from "../util/asyncHandler.js"
import ApiResponse from "../util/ApiResponse.js";
import fileUpload from "../util/cloudinary.js";
import assetModel from "../model/assetSchema.model.js";

const profile = asyncHandler(async(req,res)=> {
    const {_id} = req.user
    const file = req.file

    if (!file) throw new ApiError(400, "Image upload failed or no image was provided for the blog.");

    // make a call to the backend to check if user is legit
    const userDetail = await userModel.findById(_id)

    if(!userDetail) throw new ApiError(404,"user not found")

    // upload image to cloudinary

    const response = await fileUpload(file.path,"profile-pic",null)

    const assetFields = {
        asset_id: response.asset_id,
        public_id: response.public_id,
        etag: response.etag,
        secure_url: response.secure_url,
        asset_folder: "profile-pic",
        display_name: file.originalname, 
        original_filename: response.original_filename,
        owner: userDetail._id, 
    };
      

    if(!response) throw new ApiError(500,"Image couldn't be upload at this time please try again!")

    // create asset model

    const asset = await assetModel.create(assetFields)

    if(!asset) throw new ApiError(500,"Asset Model creation failed")
    
    const user = await userModel.findById(_id)
    user.profile_pic = asset.secure_url
    user.save({validateBeforeSave:false})
    
    
    return res
    .status(201)
    .json(new ApiResponse(201,"success")) 
}) 

export default profile