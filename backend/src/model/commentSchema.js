import {Schema,model} from "mongoose"

const commentSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: true
    },
    blogRef: {
        type: Schema.Types.ObjectId,
        ref: "blog",
        required: true
    },
    parentCommentRef: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    commentedUserRef: {
        type: Schema.Types.ObjectId,
        ref: "userDetail",
        required
    }
},{timestamps: true})

export default model("comment",commentSchema)