import express from "express";
import passport from 'passport';
const router = express.Router();
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    login,
    logout,
    register
} from "../controllers/auth.controller.js";


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