const express = require('express');
const multer = require('multer')
const path = require('path')

const { loginRequired } = require('./middleware')

const router = express.Router();
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
})
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'tweeter.shinywaterjeong',
    key(req, file, callback) {
      callback(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB
})

router.post('/images', loginRequired, upload.array('image'), (req, res) => {
  const images = req.files.map(file => ({ src: file.location.replace(/\/original\//, '/thumbnail/') }));
  return res.status(201).json({ message: '이미지를 정상적으로 업로드했습니다.', images })
})

router.post('/image', loginRequired, upload.single('image'), (req, res) => {
  const image = { src: req.file.location };
  return res.status(201).json({ message: '이미지를 정상적으로 업로드했습니다.', image })
})

module.exports = router;