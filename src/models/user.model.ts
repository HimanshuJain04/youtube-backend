import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";

// Define an interface that extends the Mongoose Document interface
interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    profileImg?: string;
    isVerified: boolean;
    playlist: string[]; // Assuming playlist contains IDs
    likedVideos: string[]; // Assuming likedVideos contains IDs
    myVideos: string[]; // Assuming myVideos contains an ID or null
    history: string[]; // Assuming history contains IDs
    watchLater: string[]; // Assuming watchLater contains IDs
    subscribedTo: string[]; // Assuming subscribedTo contains user IDs
    subscribers: string[]; // Assuming subscribers contains user IDs
    accessToken?: string; // Optional field
    refreshToken?: string; // Optional field

    // Custom methods
    generateAccessToken: () => Promise<string>;
    generateRefreshToken: () => Promise<string>;
}


const userSchema = new mongoose.Schema<IUser>(
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

const User = mongoose.model<IUser>('User', userSchema);

export default User;