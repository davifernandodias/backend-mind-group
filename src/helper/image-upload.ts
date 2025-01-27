// helper/image-upload.ts
import multer from "multer";
import path from "path";

const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = "products";  // Subpasta para imagens de produtos
    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Nome único baseado no timestamp
  }
});

export const imageUpload = multer({
  storage: imagesStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Envie apenas arquivos JPG ou PNG!"));
    }
    cb(undefined, true);
  }
});
