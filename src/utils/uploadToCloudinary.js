import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_IMAGE_FOLDER, CLOUDINARY_VIDEO_FOLDER } from '../constant.js';
import fs from "fs";


export const cloudinaryUploader = async (filePath, type) => {
    try {

        const options = {
            resource_type: "auto",
            folder: type === "Image" ? CLOUDINARY_IMAGE_FOLDER : CLOUDINARY_VIDEO_FOLDER,
        };

        const response = await cloudinary.uploader.upload(filePath, options);
        fs.unlinkSync(filePath);

        return response;

    } catch (error) {
        fs.unlinkSync(filePath);
        console.log("Image upload to cloudinary failed!")
        console.log("Error: ", error);
        return null;
    }
}