import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: {
            type: String,
            trim: true,
        },
        postUrl: {
            type: String,
            trim: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    },
    },
{
    timestamps: true
}
);

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema)

export default CommunityPost;