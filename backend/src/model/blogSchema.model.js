import { model, Schema } from "mongoose";


const blogSchema = new Schema({
    category : {
        type : String,
        required: true
    },
    title: {
        type : String,
        required: true
    },
    article: {
        type : String,
        required: true
    },
    article_image: {
        type : String,
        required: true
    },
    initialThoughts: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "userDetail",
        required: true
    },
    sentiment: {
        type: String
    }
},{timestamps:true})

export default model("blog",blogSchema)