import { Request, Response, NextFunction } from "express"
import { ApiError } from "utils/apiError";
import jwt, { decode } from "jsonwebtoken"
import User from "models/user.model";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies?.VideoHub_Access_Token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(404, "Token is missing");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!("_id" in decodedToken)) {
            throw new ApiError(401, "Invalid Access Token");
        }

        const user = await User
            .findById(decodedToken?._id)
            .select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;

        next();

    } catch (error) {

        throw new ApiError(500, "Something went wrong while verifying the token", error);
    }
}
