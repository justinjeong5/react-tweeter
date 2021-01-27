const express = require('express');
const multer = require('multer')

const { loginRequired } = require('./middleware')

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      done(null, `${new Date().getTime()}_${file.originalname}`)
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB
})

router.post('/images', loginRequired, upload.array('image'), (req, res) => {
  const images = req.files.map(file => ({ src: file.filename }));
  return res.status(201).json({ message: '이미지를 정상적으로 업로드했습니다.', images })
})

module.exports = router;