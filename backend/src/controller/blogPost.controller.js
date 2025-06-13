import asyncHandler from "../util/asyncHandler.js"
import fileUpload from "../util/cloudinary.js";
import ApiError from "../util/ApiError.js";
import blogModel from "../model/blogSchema.model.js";
import assetModel from "../model/assetSchema.model.js";
import ApiResponse from "../util/ApiResponse.js";
import axios from "axios"; 


  const analyzeSentiment = async (article) => {
    const prompt = `Analyze the sentiment of the following article. Respond with just one word: Positive, Negative or Neutral. 
    Article: ${article} `
    try {
      const response = await axios({
        method:"POST",
        url:"https://open-ai21.p.rapidapi.com/conversationllama",
        headers : {
          "Content-Type": "application/json",
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "x-rapidapi-key": process.env.KEY 
        },
        data: {
          messages:[{role:"user",content:prompt}],
          "web_access":false
        }
      })
      return response.data.result
    } catch (error) {
      throw new ApiError(500,error.message,"Sentiment Creation Failed")
    }
  };



const blogPost = asyncHandler(async(req,res) => {
    const {_id} = req.user
    const {category,title,initialThoughts,rating,article} = req.body
    const file = req.file

    console.log(category,title,initialThoughts,rating,article)
    
    if (!category) throw new ApiError(400, "Category is required for the blog post.");
    
    if (!title) throw new ApiError(400, "Title is required. Please provide a title for your blog.");
    
    if (!article) throw new ApiError(400, "Article content is missing. Please write something in the blog.");
    
    if (!file) throw new ApiError(400, "Image upload failed or no image was provided for the blog.");

    if (!initialThoughts || initialThoughts.trim() === "")
      throw new ApiError(400, "Please share your initial thoughts about the blog.");

    if (!rating || rating < 1 || rating > 5)
      throw new ApiError(400, "Please provide a valid rating between 1 and 5.");

    

    // upload image to cloudinary

    const response = await fileUpload(file.path,"blog-post",null)

    const assetFields = {
        asset_id: response.asset_id,
        public_id: response.public_id,
        etag: response.etag,
        secure_url: response.secure_url,
        asset_folder: "blog-post",
        display_name: file.originalname, 
        original_filename: response.original_filename,
        owner: _id,  
    };
      

    if(!response) throw new ApiError(500,"Image couldn't be upload at this time please try again!")

    // create asset model

    const asset = await assetModel.create(assetFields)

    if(!asset) throw new ApiError(500,"Asset Model creation failed")
    

    const sentiment = await analyzeSentiment(article);


    // create post

    const post = await blogModel.create({category,title,initialThoughts,article,rating,article_image:asset.secure_url,owner:_id,sentiment})

    if(!post) throw new ApiError(500,"post cannot be created")
    
    asset.post = post._id
    await asset.save({validateBeforeSave:false})

    return res
    .status(201)
    .json(new ApiResponse(201,{},"Your article has been successfully posted"))
})


export default blogPost