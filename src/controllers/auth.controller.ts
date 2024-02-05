import { asyncHandler } from "utils/asyncHandler";
import User from "../models/user.model";
import { Response, Request } from "express";
import bcrypt from "bcrypt";


// important variables
const saltRound = 10;


// Helper Functions



export const register = asyncHandler(async (req: Request, res: Response): Promise<Response> => {

    try {

        // fetch data from body
        const {
            email,
            userName,
            fullName,
            password,
        } = req.body;

        const { profileImg } = req?.files;

        console.log("req: ", req);

        // validation
        if (!email || !fullName || !userName || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"

                }
            )
        }

        // validate the user
        const existedUser = await User.findOne(
            {
                $or: [{ email }, { userName }]
            }
        );

        if (existedUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User with this email or username already exists"
                }
            )
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, saltRound);

        // upload the profile-image
        let url: string = "";

        if (profileImg) {
            // upload the image on cloud storage

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

        // return response
        return res.status(200).json(
            {
                success: true,
                message: "User Registered Successfully",
                data: [user]
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                success: false,
                message: "Server failed to register user, try again later",
                error: error
            }
        );
    }

});