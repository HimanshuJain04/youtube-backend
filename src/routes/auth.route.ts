import express from "express";
import passport from 'passport';
const router = express.Router();
import { upload } from "../middlerwares/multer.middleware";
import {
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

export default router;