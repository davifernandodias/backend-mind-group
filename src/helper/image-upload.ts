import fs from 'fs';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// Defina o caminho correto para armazenar as imagens
const uploadPath = path.resolve(__dirname, '..', '..', 'public', 'images', 'products');

// Crie o diretório se ele não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuração do Multer
export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      // Diretório onde a imagem será salva
      callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
});
