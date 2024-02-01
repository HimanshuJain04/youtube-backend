// import 
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";


// variables
const app = express();
const PORT = 4000;

// Middlewares
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// server listen
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
});


app.get("/", (req, res) => {
    res.send("Default Route");
});