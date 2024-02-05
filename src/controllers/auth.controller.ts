import User from "../models/user.model";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { cloudinaryUploader } from "../utils/uploadToCloudinary";
import fs from "fs"


// important variables
const saltRound = 10;


// Helper Functions


// register
export const register = async (req: Request, res: Response): Promise<Response> => {

    try {

        // fetch data from body
        const {
            email,
            userName,
            fullName,
            password,
        } = req.body;

        // validation
        if (!email || !fullName || !userName || !password) {
            throw new ApiError(400, "All fields are required");
        }

        // validate the user
        const existedUser = await User.findOne(
            {
                $or: [{ email }, { userName }]
            }
        );

        console.log("Existed : ", existedUser);

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, saltRound);

        // upload the profile-image
        let url: string = "";

        if ("profileImg" in req.files) {

            const profileImgPath = req.files.profileImg[0]?.path;

            // upload the image on cloud storage
            const response = await cloudinaryUploader(profileImgPath, "Image");

            console.log("Res: ", response)
            url = response.secure_url;

        } else {
            // get temp-image by name
            url = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;
        }


        // create the entry in db of user
        const user = await User.create(
            {
                userName,
                fullName,
                email,
                password: hashedPass,
                profileImg: url
            }
        );

        const createdUser = await User
            .findById(user._id)
            .select(
                "-password -refreshToken"
            );

        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                createdUser,
                "User Registered Successfully"
            )
        );

    } catch (error) {

        throw new ApiError(500, "Server failed to register user, try again later", error)
    }

}