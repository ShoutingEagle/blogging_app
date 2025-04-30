import jwt from "jsonwebtoken";
import ApiError from "../util/ApiError.js";
import asyncHandler from "../util/asyncHandler.js";
import userModel from "../model/userSchema.model.js"

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshTokenOptions = {
    ...options,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days 
};


const refreshAccessToken = async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await userModel.findById(decodedToken?._id)
        
        if(!user) throw new ApiError(401, "invalid refresh token")
            if(incomingRefreshToken !== user.refreshToken) throw new ApiError(401, "refresh token expired")

                const newAccessToken = user.generateAccessToken()
                const newRefreshToken = user.generateRefreshToken()

            user.refreshToken = newRefreshToken
            await user.save({validateBeforeSave : false})

            res.cookie("accessToken",newAccessToken,options)
            res.cookie("refreshToken",newRefreshToken,refreshTokenOptions)

            return newAccessToken

        } catch (error) {
            throw new ApiError(401,error?.message || "invalid refresh token")
        }
}

export default refreshAccessToken