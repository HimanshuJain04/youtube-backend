import User from "../models/user.model";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { cloudinaryUploader } from "../utils/uploadToCloudinary";
import jwt from "jsonwebtoken";


// important variables
const saltRound = 10;


// Helper Functions
const generateRefreshAndAccessToken = async (userId: string) => {
    try {

        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}


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
                { user: createdUser },
                "User Registered Successfully",
            )
        );

    } catch (error) {

        throw new ApiError(500, "Server failed to register user, try again later", error)
    }

}

// login
export const login = async (req: Request, res: Response): Promise<Response> => {

    try {

        // fetch data from body
        const {
            email,
            password
        } = req.body;

        // validation
        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        // validate the user
        const existedUser = await User.findOne({ email });

        if (!existedUser) {
            throw new ApiError(404, "User not registered");
        }

        // compare the password
        const isPasswordCorrect = await bcrypt.compare(password, existedUser.password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Password doesn't match");
        }

        // create refresh and access token

        const { refreshToken, accessToken } = await
            generateRefreshAndAccessToken(existedUser._id);

        const loggedInUser = await User
            .findById(existedUser._id)
            .select("-password -refreshToken");

        const options = {
            https: true,
            secure: true
        }


        // return response
        return res
            .status(200)
            .cookie("VideoHub_Access_Token", accessToken, options)
            .cookie("VideoHub_Refresh_Token", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        refreshToken,
                        accessToken
                    },
                    "User logged in successfully",
                )
            );

    } catch (error) {
        throw new ApiError(500, "Server failed to login the user, try again later", error)
    }
}

export const logout = async (req: Request, res: Response): Promise<Response> => {

    try {

        if (!("_id" in req.user)) {

            throw new ApiError(401, "User not found to logout")
        }

        const userId = req.user._id;

        // set refresh token to undefined
        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        );

        // clear cookies
        const options = {
            https: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("VideoHub_Access_Token", options)
            .clearCookie("VideoHub_Refresh_Token", options)
            .json(
                new ApiResponse(
                    200,
                    [],
                    "User Logged out successfully",
                )
            )

    } catch (error) {

        throw new ApiError(500, "Server failed to logout user, try again later", error)
    }

}