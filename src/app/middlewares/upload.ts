import { diskStorage, Options } from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: diskStorage({
    destination: path.resolve(__dirname, '..', '..',
      '..', 'storage'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err, file.filename);

        const separatedName = file.originalname.split('.');

        const filename = `${separatedName[0]}-${hash}.${separatedName[separatedName.length - 1]}`;

        return cb(null, filename);
      });
    },
  }),
} as Options;
