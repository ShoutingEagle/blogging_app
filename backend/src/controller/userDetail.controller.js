import userModel from "../model/userSchema.model.js";
import asyncHandler from "../util/asyncHandler.js";
import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";
import fileUpload from "../util/cloudinary.js";
import assetModel from "../model/assetSchema.model.js";

const userDetail = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const file = req.file;
    const { username } = req.body;
    console.log(_id,username)
    if (!file) throw new ApiError(400, "Image upload failed or no image was provided.");
    if (!username) throw new ApiError(400, "Username is required.");


    // check if username already exist in the db
    const usernameTaken = await userModel.findOne({username});
    if (usernameTaken) throw new ApiError(400, "username already taken");


    
    // Upload image to Cloudinary
    const response = await fileUpload(file.path, "profile-pic", null);
    if (!response) throw new ApiError(500, "Image couldn't be uploaded at this time, please try again!");

    // Create asset document
    const assetFields = {
        asset_id: response.asset_id,
        public_id: response.public_id,
        etag: response.etag,
        secure_url: response.secure_url,
        asset_folder: "profile-pic",
        display_name: file.originalname,
        original_filename: response.original_filename,
    };

    const asset = await assetModel.create(assetFields);
    if (!asset) throw new ApiError(500, "Asset Model creation failed");

    const updateUserDetail = await userModel.findByIdAndUpdate(
        _id,
        {
            profile_pic: asset.secure_url,
            username
        },
        {new: true, validateBeforeSave: false}
    )
    console.log("updateUserDetail _id",updateUserDetail._id)

    const updateAsset = await assetModel.findByIdAndUpdate(
        asset._id,
        {
            user : updateUserDetail._id,
        },
        {new: true, validateBeforeSave:true}
    )
    console.log("updateAsset",updateAsset)


    return res
        .status(201)
        .json(new ApiResponse(201, "User details updated successfully"));
});

export default userDetail;
