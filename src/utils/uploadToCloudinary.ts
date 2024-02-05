import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_IMAGE_FOLDER, CLOUDINARY_VIDEO_FOLDER } from '../constant';

// Define a type for the upload options
interface UploadOptions {
    resource_type?: string;
    folder?: string;
}

export const imageUploader = async (image: any): Promise<any | null> => {
    try {

        const options: UploadOptions = {
            resource_type: "auto",
            folder: CLOUDINARY_IMAGE_FOLDER
        };

        return await cloudinary.uploader.upload(image, options);

    } catch (error) {
        console.log("Image upload to cloudinary failed!")
        console.log("Error: ", error);
        return null;
    }
}

export const videoUploader = async (video: any): Promise<any | null> => {
    try {
        const options: UploadOptions = {
            resource_type: "auto",
            folder: CLOUDINARY_VIDEO_FOLDER
        };

        return await cloudinary.uploader.upload(video, options);

    } catch (error) {
        console.log("Video upload to cloudinary failed!")
        console.log("Error: ", error);
        return null;
    }
}
