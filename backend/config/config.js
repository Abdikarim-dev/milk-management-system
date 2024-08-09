import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const SMS_API_USERNAME = process.env.SMS_API_USERNAME;
export const SMS_API_PASSWORD = process.env.SMS_API_PASSWORD;
export const SMS_API_URL = process.env.SMS_API_URL;
export const WAIT_MSG_ID = process.env.WAIT_MSG_ID;

