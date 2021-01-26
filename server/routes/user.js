const express = require('express');
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const router = express.Router();
router.post('/register', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      return res.status(403).json({ code: 'AlreadyExistUser', message: '이미 사용중인 이메일입니다.', });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).json({ message: '회원가입이 정상적으로 완료되었습니다.' })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
