import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        profileImg: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        playlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Playlist"
            }
        ],
        likedVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        myVideos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel"
        },
        history: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        watchLater: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        subscribedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        subscribers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema)

export default User;