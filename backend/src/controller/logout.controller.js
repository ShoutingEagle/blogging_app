import userModel from "../model/userSchema.model.js";
import ApiError from "../util/ApiError.js";
import ApiResponse from "../util/ApiResponse.js";
import asyncHandler from "../util/asyncHandler.js";

const isProd = process.env.NODE_ENV === "production";

const options = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Lax",
};


const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await userModel.findByIdAndUpdate(_id, {
    $unset: { refreshToken: 1 },
  });

  if (!user) throw new ApiError(404, "User not found");

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logged out successfully"));
});

export default logout;
