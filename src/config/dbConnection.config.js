import mongoose from "mongoose";
import { DB_NAME } from "../constant";

export const dbConnection = async () => {

    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        .then(() => {
            console.log("Mongo Db Connection established")
        })
        .catch(err => {
            console.log("Mongo Db Connection error: " + err);
            process.exit(1);
        });
}