import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

// Configura Cloudinary una sola vez en la inicialización de la aplicación
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const saveImage = async (path_img) => {
    try {
        const result = await cloudinary.uploader.upload(path_img);
        const public_id = result.public_id;
        return public_id;
    } catch (e) {
        console.error(e);
        throw new Error('Error uploading image to Cloudinary');
    }
}

export default saveImage;