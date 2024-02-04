import mongoose, { mongo } from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        duration: {
            type: Number,
        },
        thumbnailUrl: {
            type: String,
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAgeRestricted: {
            type: Boolean,
            default: false,
        },
        featuredTimestamps: [
            {
                timestamp: {
                    type: Number,
                    required: true,
                },
                description: {
                    type: String,
                    trim: true,
                },
            }
        ],
        privacy: {
            type: String,
            enum: ["Public", "Private"],
            default: "Public",
        },
        like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        dislike: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        views: {
            type: BigInt,
            default: 0,
        }
    },
    {
        timestamps: true
    }
);

const Video = mongoose.model('Video', videoSchema)

export default Video;