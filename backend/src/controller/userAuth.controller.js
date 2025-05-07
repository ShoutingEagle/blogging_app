import otpModel from "../model/otpSchema.model.js"
import userModel from "../model/userSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"
import asyncHandler from "../util/asyncHandler.js"

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


const userAuth = asyncHandler(async(req,res) => {
    const {email,otp,mode} = req.body
    
    const otpVerification = await otpModel.findOne({email})  
    if(!otpVerification) throw new ApiError("Otp not found, please send otp first")
    
    if(otp!==otpVerification.otp) throw new ApiError("Incorrect OTP")
    
    
    await otpModel.deleteOne({email})

    let user 
    if(mode === "signup"){
        user = await userModel.create({email})
    }else{
        user = await userModel.findOne({email})
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})

    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,refreshTokenOptions)
    .json(new ApiResponse(200,{accessToken,refreshToken},"success"))

})

export default userAuth