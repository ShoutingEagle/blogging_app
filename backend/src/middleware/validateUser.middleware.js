import refreshAccessToken from "../util/refreshAccessToken.js";
import ApiError from "../util/ApiError.js";
import asyncHandler from "../util/asyncHandler.js";
import jwt from "jsonwebtoken"


const validateUser = asyncHandler(async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    let accessTokenFailed = false;

    if (accessToken) {
        try {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (!decodedToken) throw new ApiError(500, "Token decoding failed");
            req.user = { _id: decodedToken._id };
            return next();
        } catch (error) {
            console.error("Access token verification failed:", error.message);
            console.trace("Trace from access token failure");
            accessTokenFailed = true;
        }
    }

    if ((!accessToken || accessTokenFailed) && !refreshToken) {
        throw new ApiError(401, "Unauthorized access");
    }

    if (refreshToken) {
        try {
            const newAccessToken = await refreshAccessToken(req, res);
            if (!newAccessToken) throw new ApiError(500, "Could not refresh access token");

            const decodedToken = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = { _id: decodedToken._id };
            return next();
        } catch (error) {
            console.error("Refresh token verification failed:", error.message);
            console.trace("Trace from refresh token failure");
            throw new ApiError(500, "Token verification failed");
        }
    }
});

export default validateUser