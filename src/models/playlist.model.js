import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        videos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist;