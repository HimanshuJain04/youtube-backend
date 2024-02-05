import express from "express";
import passport from 'passport';
const router = express.Router();
import {
    register
} from "../controllers/auth.controller";


// register routes

router.route("/register").post(register);

export default router;