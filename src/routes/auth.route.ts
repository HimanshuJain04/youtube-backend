import express from "express";
import passport from 'passport';
const router = express.Router();
import { upload } from "../middlerwares/multer.middleware";
import { verifyJWT } from "middlerwares/auth.middleware";
import {
    login,
    logout,
    register
} from "../controllers/auth.controller";


// register routes

router.route("/register").post(upload.fields(
    [
        {
            name: "profileImg",
            maxCount: 1,
        }
    ]
), register);

router.route("/login").post(login);

router.route("/logout").post(verifyJWT, logout);

export default router;