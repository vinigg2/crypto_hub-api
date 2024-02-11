import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { app } from './app';

const isDev = process.env.NODE_ENV !== 'production';

const endpoint = isDev && {
  protocol: 'http:',
  hostname: app.aws.endpoint.replace('http://', ''),
  path: '/',
};

const s3Config = new S3Client({
  region: app.aws.region,
  endpoint,
  forcePathStyle: isDev,
  credentials: {
    accessKeyId: app.aws.key_id,
    secretAccessKey: app.aws.secret_key,
  },
});

export const multer = {
  storage: multerS3({
    s3: s3Config,
    bucket: app.aws.bucket_name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};
