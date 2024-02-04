// import
import { app } from "./app";
import http from "http";
import dotenv from "dotenv";
import { dbConnection } from "./config/dbConnection.config";
import { passportInitialize } from "./config/passport.config";


// import routes
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";


// Load environment variables
dotenv.config();


// variables
const PORT = process.env.PORT || 5000;

//cloudinary

// passportInitialize
passportInitialize();


// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Default route handler
app.get("/", (req, res) => {
    res.send("Default Route");
});

// dbConenction
dbConnection()
    .then(() => {

        // server listen
        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log("Server listening on port: ", PORT)
        });

    })
    .catch((error) => {
        console.log("DB connection failed: ", error);
    });
