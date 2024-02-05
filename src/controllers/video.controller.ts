import { asyncHandler } from "utils/asyncHandler";
import User from "../models/user.model";
import Video from "../models/video.model";
import { Response, Request } from "express";


export const createVideo = asyncHandler(async (req: Request, res: Response): Promise<Response> => {

    try {

        // fetch data from body
        const {
            title,
            description,
            category,
            isAgeRestricted,
            privacy,
            tags,
            featuredTimestamps,
            userId,
        } = req.body;

        const { thumbnailImage, uploadedVideo } = req.files;

        console.log("req: ", req);

        // validation
        if (!title || !description || !userId || !thumbnailImage || !uploadedVideo || !category || !isAgeRestricted || !privacy) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"

                }
            )
        }

        // validate the user
        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User doesn't exist"

                }
            )
        }

        // upload the video and thumbnail-image


        // create the entry in db of video


        // push the video into user-db

        // return response
        return res.status(200).json(
            {
                success: true,
                message: "Video Uploaded Successfully",
                data: []
            }
        )

    } catch (error) {

        return res.status(500).json(
            {
                success: false,
                message: "Server failed to upload video, try again later",
                error: error
            }
        )
    }

});