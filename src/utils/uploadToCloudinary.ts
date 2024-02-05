import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { CLOUDINARY_IMAGE_FOLDER, CLOUDINARY_VIDEO_FOLDER } from '../constant';
import fs from "fs";


export const cloudinaryUploader = async (filePath: string, type: string): Promise<any | null> => {
    try {

        const options: ConfigOptions = {
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