const express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { User, Post } = require('../models');
const { loginRequired, logoutRequired } = require('./middleware')

const router = express.Router();
router.post('/register', logoutRequired, async (req, res, next) => {
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

router.post('/login', logoutRequired, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    if (info) {
      return res.status(401).json(info)
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError)
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] },
        include: [{
          model: Post,
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
        }]
      })
      return res.status(200).json({ message: '로그인이 정상적으로 완료되었습니다.', user: fullUserWithoutPassword })
    })
  })(req, res, next);
});

router.post('/logout', loginRequired, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: '로그아웃이 정상적으로 완료되었습니다.' })
})

module.exports = router;
