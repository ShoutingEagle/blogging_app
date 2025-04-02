import ApiError from "../util/ApiError.js"
import asyncHandler from "../util/asyncHandler.js"
import otpGeneration from "../util/crypto.js";
import userModel from "../model/userSchema.model.js"
import otpModel from "../model/otpSchema.model.js";
import ApiResponse from "../util/ApiResponse.js";
import sendEmail from "../util/emailUtility.js";


const sendOtpEmail = async (email,otp) => {
    const sendMailResponse = await sendEmail({
        to: email,
        subject: "Your OTP for verification",
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP is <strong> ${otp}</strong>.</p>`,
    });

    if (!sendMailResponse || sendMailResponse.accepted.length === 0){
        throw new ApiError(500,"Failed to send OTP email, please try again.")
    }
}

const generateOtp = asyncHandler(async(req,res) => {
    // get email and mode from req.body
    let {email,mode} = req.body
    email = email?.trim().toLowerCase()
    
    // check if email and mode is present
    if (!email) throw new ApiError(400, "Email is required");
    if (!mode) throw new ApiError(400, "Mode is required.");
     
    // check if email is already present in database
    const user = await userModel.findOne({email})

    if(user && mode==="signup") throw new ApiError(400,"User already exists, Please login")
        
    if(!user && mode==="login") throw new ApiError(400,"User doesn't exists, Please Signup")

    const otp = otpGeneration()
    await sendOtpEmail(email,otp)
    await otpModel.updateOne(
            {email},
            {$set:{otp}},
            {upsert:true} // If no document exists, create a new one
        )

    return res.status(201).json(
        new ApiResponse(201, "OTP sent successfully")
    );
    
}) 

export default generateOtp