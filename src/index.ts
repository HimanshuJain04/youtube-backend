// import 
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { dbConnection } from "./config/dbConnection.config";
import passport from "passport";
import expressSession from "express-session";
import { passportInitialize } from "./config/passport.config";


// import routes
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";


// config
dotenv.config();


// variables
const app = express();
const PORT = process.env.PORT || 5000;


// dbConenction
// dbConnection();

//cloudinary

// passportInitialize
passportInitialize();


// Middlewares
app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressSession(
    {
        secret: "EXPRESS_SESSION_SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }
    }
));
app.use(passport.initialize());
app.use(passport.session());


// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


// server listen
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
});


app.get("/", (req, res) => {
    res.send("Default Route");
});