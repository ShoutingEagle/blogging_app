import userModel from "../model/userSchema.model.js";
import ApiError from "../util/ApiError.js";
import asyncHandler from "../util/asyncHandler.js";
import ApiResponse from "../util/ApiResponse.js";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

const options = {
    httpOnly: true,
    secure: isProd, // true in prod (requires HTTPS), false in dev
    sameSite: isProd ? "None" : "Lax", // None in prod for cross-origin, Lax for dev
    maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshTokenOptions = {
    ...options,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const checkAuth = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res
        .status(401)
        .json(new ApiResponse(401, {
            userAuth: false, 
            isProfileComplete: false
        }, "failed"));

    let decodedToken;
    try {
        decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Session expired or token is invalid. Please log in again.");
    }

    const user = await userModel.findById(decodedToken._id).select("profile_pic username refreshToken");

    if (!user) throw new ApiError(404, "User not found.");
    
    if (!user.profile_pic || !user.username) {
        return res.status(401).json(
            new ApiResponse(401, { 
                isProfileComplete: false 
            }, "Profile incomplete")
        );
    }
    

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
        .json(new ApiResponse(200, { 
            isProfileComplete: true
        }, "success"));
});

export default checkAuth;
