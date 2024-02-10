import { asyncHandler } from "utils/asyncHandler.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import { ApiError } from 'utils/apiError.js';
import { cloudinaryUploader } from '../utils/uploadToCloudinary.js';
import { ApiResponse } from "utils/apiResponse.js";
import CommunityPost from "../models/communityPost.model.js";


export const createPost = asyncHandler(async (req, res) => {

    try {

        // fetch data from body
        const {
            description,
            userId,
        } = req.body;

        const postPath = req.files.thumbnailImage[0]?.path;

        console.log("req: ", req.files);
        console.log("req: ", req.body);


        // validation
        if (!postPath && !description) {
            throw new ApiError(400, "All fields are required");
        }


        // validate the user
        const existedUser = await User.findById(userId);

        if (!existedUser) {
            throw new ApiError(404, "User doesn't exist");
        }

        let postRes = null;

        // upload the pot if available
        if (postPath) {
            postRes = await cloudinaryUploader(postPath, "Image");
        }

        console.log("postRes : ", postRes);

        // create the entry in db of video
        const newPost = await CommunityPost.create(
            {
                description,
                user: existedUser._id,
                postUrl: postRes ? postRes.secure_url : null
            }
        );

        console.log("New newPost: ", newPost);

        // push the post into user-db
        existedUser.communityPost.push(newPost._id);

        await existedUser.save();

        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                newPost,
                "Post Uploaded Successfully",
            )
        )

    } catch (error) {
        throw new ApiError(500, "Server failed to upload post, try again later", error, false)
    }

});