import mongoose, { mongo } from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
        },
        profileUrl: {
            type: String,
        },
        coverUrl: {
            type: String,
        },
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

const Channel = mongoose.model('Channel', channelSchema)

export default Channel;