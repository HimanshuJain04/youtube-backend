import { asyncHandler } from "utils/asyncHandler";
import User from "../models/user.model";
import Video from "../models/video.model";
import { Response, Request } from "express"

export const createVideo = asyncHandler(async (req, res) => {

    // fetch data from body
    const {
        title,
        description,
        tags,
        category,
        isAgeRestricted,
        privacy,
        featuredTimestamps
    } = req.body;


    // validation
    if (!title || !description || !category || !isAgeRestricted || !privacy) {
        return res.status(400).json(
            {
                success: false,
                message: "All fields are required"

            }
        )
    }

});