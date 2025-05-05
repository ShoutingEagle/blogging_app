import { model, Schema } from "mongoose";

const assetSchema = new Schema({
    asset_id : {
        type: String,
        required : true
    },
    public_id : {
        type: String,
        required : true
    },
    etag : {
        type: String,
        required : true
    },
    secure_url : {
        type: String,
        required : true
    },
    asset_folder : {
        type: String,
        required : true
    },
    display_name: {
        type: String,
        required : true
    },
    original_filename: {
        type: String,
        required : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "userDetail",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    }
},{timestamps:true})

export default model("asset",assetSchema)