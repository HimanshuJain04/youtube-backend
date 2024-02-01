import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";



const app = express();

app.use(cors({
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());