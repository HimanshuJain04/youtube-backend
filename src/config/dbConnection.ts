import mongoose from "mongoose";

export const dbConnection = async () => {

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Mongo Db Connection established")
        })
        .catch(err => {
            console.log("Mongo Db Connection error: " + err);
            process.exit(1);
        });
}