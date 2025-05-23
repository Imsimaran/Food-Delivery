import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete the local file after upload
    unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Attempt to delete local file even if upload fails
    try {
      unlinkSync(localFilePath);
    } catch (fsErr) {
      console.error("Failed to delete local file:", fsErr.message);
    }

    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};
