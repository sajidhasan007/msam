import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
// import sharp from 'sharp';
import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  // await compressAndUpload(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// const compressAndUpload = async (file: IUploadFile): Promise<void> => {
//   // Use sharp to compress the image
//   const compressedImageBuffer = await sharp(file.path)
//     .resize({ width: 800, height: 600 })
//     .toBuffer();

//   // Save the compressed image to the local server
//   fs.writeFileSync(file.path, compressedImageBuffer);
// };

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
