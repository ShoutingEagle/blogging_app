import {Schema,model} from "mongoose"

const commentSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
        required: true
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    commentedUserId: {
        type: Schema.Types.ObjectId,
        ref: "userDetail",
        required
    }
},{timestamps: true})

export default model("comment",commentSchema)