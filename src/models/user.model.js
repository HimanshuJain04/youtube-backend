import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
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
        myVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
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
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
);


userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model('User', userSchema);

export default User;