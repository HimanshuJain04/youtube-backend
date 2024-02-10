import { asyncHandler } from "utils/asyncHandler.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import { Response, Request } from "express";
import { ApiError } from 'utils/apiError.js';
import { cloudinaryUploader } from '../utils/uploadToCloudinary.js';
import { ApiResponse } from "utils/apiResponse.js";


export const createVideo = async (req, res) => {

    try {

        // fetch data from body
        const {
            title,
            description,
            category,
            isAgeRestricted,
            status,
            tags,
            featuredTimestamps,
            userId,
        } = req.body;



        if (!("thumbnailImage" in req.files) || ("uploadedVideo" in req.files)) {
            throw new ApiError(400, "All fields are required");
        }


        const thumbnailImagePath = req.files.thumbnailImage[0]?.path;
        const uploadedVideoPath = req.files.uploadedVideo[0]?.path;


        console.log("req: ", req.files);
        console.log("req: ", req.body);


        // validation
        if (!title || !description || !userId || !thumbnailImagePath || !uploadedVideoPath || !category || !isAgeRestricted || !status) {
            throw new ApiError(400, "All fields are required");
        }


        // validate the user
        const existedUser = await User.findById(userId);

        if (!existedUser) {
            throw new ApiError(404, "User doesn't exist");
        }


        // upload the video and thumbnail-image
        const thumbnailRes = await cloudinaryUploader(thumbnailImagePath, "Image");
        const videoRes = await cloudinaryUploader(uploadedVideoPath, "Video");

        console.log("Video : ", videoRes)

        // TODO: duration
        // get video duration from response
        const duration = 5;

        // create the entry in db of video
        const newVideo = await Video.create(
            {
                title,
                description,
                category,
                uploader: userId,
                isAgeRestricted,
                status,
                videoUrl: videoRes.secure_url,
                thumbnailUrl: thumbnailRes.secure_url,
                tags,
                duration,
                featuredTimestamps,

            }
        );

        console.log("New video: ", newVideo);

        // if ("_id" in newVideo)
        existedUser.myVideos.push(newVideo._id);
        // push the video into user-db

        await existedUser.save();

        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                newVideo,
                "Video Uploaded Successfully",
            )
        )

    } catch (error) {
        throw new ApiError(500, "Server failed to upload video, try again later", error, false)
    }

}


export const getVideoById = async (req, res) => {

    try {

        // fetch id from params
        const { videoId } = req.params;

        // validation
        if (!videoId) {
            throw new ApiError(400, "All fields are required");
        }

        const requiredVideo = await Video.findById(videoId)
            .populate(
                {
                    path: "comments",
                    populate: {
                        model: "Comment",
                    }
                }
            )
            .exec();

        // validation
        if (!requiredVideo) {
            throw new ApiError(404, "Video not found");
        }

        console.log("requiredVideo video: ", requiredVideo);

        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                requiredVideo,
                "Video fetched by id successfully",
            )
        )

    } catch (error) {
        throw new ApiError(500, "Server failed to fetched video by id, try again later", error, false)
    }

}

export const getVideo = async (req, res) => {

    try {

        // fetch id from params
        const { videoId } = req.params;

        // validation
        if (!videoId) {
            throw new ApiError(400, "All fields are required");
        }

        const requiredVideo = await Video.findById(videoId);

        // validation
        if (!requiredVideo) {
            throw new ApiError(404, "Video not found");
        }

        console.log("requiredVideo video: ", requiredVideo);

        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                requiredVideo,
                "Video fetched by id successfully",
            )
        )

    } catch (error) {
        throw new ApiError(500, "Server failed to fetched video by id, try again later", error, false)
    }
}


//  TODOS:
// SEND only limited data to frontend
// get related videos
// get feed videos
// create community post, and like dislike on that post
// like on video
// dislike on video
// subscribe the channel
// unsubscribe the channel
// create comments
// like | dislike on comments
// update video | post | comment
// delete method on the previous step
// create playlist
// get liked video
// get history
// get all playlists
// get playlist videos
// search video by name tags and category basis
// search channel
// filters by duration | likes | time | views
// increase views on video when getting
// data about subscriber and not subscriber on video
// data about new subscriber
// views data acc. to date......
// get videos on category basis
// get videos on tags basis
// trending videos
// most watched videos
// most liked videos




