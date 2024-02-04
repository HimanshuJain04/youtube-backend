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



dotenv.config();


// variables
const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// dbConenction
dbConnection();

//cloudinary


// server listen
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
});


app.get("/", (req, res) => {
    res.send("Default Route");
});