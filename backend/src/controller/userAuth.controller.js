import otpModel from "../model/otpSchema.model.js"
import userModel from "../model/userSchema.model.js"
import ApiError from "../util/ApiError.js"
import ApiResponse from "../util/ApiResponse.js"
import asyncHandler from "../util/asyncHandler.js"

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7*24*60*60*1000 // 7days
}

const refreshTokenOptions = {
    ...options,
    maxAge: 15*24*60*60*1000 // 15 days
}

const userAuth = asyncHandler(async(req,res) => {
    const {email,otp,mode} = res.body

    const otpVerification = await otpModel.findOne({email})  
    if(!otpVerification) throw new ApiError("Otp not found, please send otp first")
    
    if(!otp===otpVerification.otp) throw new ApiError("Incorrect OTP")

    await otpModel.deleteOne({email})
    if(mode === "signup"){
        await userModel.create({email})
        res
        .status(201)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,refreshTokenOptions)
        .json(new ApiResponse(201,{accessToken,refreshToken},"success"))
    }

    res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,refreshTokenOptions)
    .json(new ApiResponse(201,{accessToken,refreshToken},"success"))

    
})

export default userAuth