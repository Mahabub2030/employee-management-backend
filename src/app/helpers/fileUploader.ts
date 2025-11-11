import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";
import config from "../../config";

// ✅ Ensure uploads folder exists
const uploadFolder = path.join(process.cwd(), "/uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// ✅ Multer storage setup with file extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // preserve original file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// ✅ Cloudinary upload function with proper error handling
const uploadTocloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
    });

    // ✅ Optional: delete local file after upload
    await fs.promises.unlink(file.path);

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error; // throw error to handle it in the route/controller
  }
};

// ✅ Fixed export typo
export const fileUploader = { upload, uploadTocloudinary };
