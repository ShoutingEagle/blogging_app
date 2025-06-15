import blogModel from "../model/blogSchema.model.js";
import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";

const latestReviews = async (req, res, next) => {
  try {
    const reviews = await blogModel
      .find()
      .sort({ createdAt: -1 }) // Optional: ensure latest reviews
      .limit(3)
      .populate("owner", "username profile_pic");

    if (!reviews || reviews.length === 0) {
      throw new ApiError(404, "No reviews found");
    }

    res.status(200).json(new ApiResponse(200, { reviews }));
  } catch (error) {
    console.log(error); // Pass to global error handler
  }
};

export default latestReviews;
