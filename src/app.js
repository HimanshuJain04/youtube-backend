// imports
import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import passport from "passport";
import expressSession from "express-session";


const app = express();

// Load environment variables
const { CORS_ORIGIN, EXPRESS_SESSION_SECRET } = process.env;


// Middlewares
app.use(cors({
    origin: CORS_ORIGIN || '*',
    credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static("public"));
app.use(cookieParser());
app.use(expressSession(
    {
        secret: EXPRESS_SESSION_SECRET || "defaultSecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }
    }
));
app.use(passport.initialize());
app.use(passport.session());

export { app };