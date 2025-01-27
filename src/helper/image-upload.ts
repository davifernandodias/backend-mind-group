import fs from 'fs';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadPath = path.resolve(__dirname, '..', '..', 'public', 'images', 'products');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
});
