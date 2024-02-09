import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: {
            type: String,
            trim: true,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        dislikesCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;