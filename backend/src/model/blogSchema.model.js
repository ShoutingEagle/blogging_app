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
    owner : {
        type: Schema.Types.ObjectId,
        ref: "userDetail",
        required: true
    }
})

export default model("blog",blogSchema)