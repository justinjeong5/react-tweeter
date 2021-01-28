const express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { User, Post, Image } = require('../models');
const { loginRequired, logoutRequired } = require('./middleware')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user?.id) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        include: [{
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
        }, {
          model: Image,
        }]
      })
      return res.status(200).json({ message: '로그인 상태가 정상적으로 확인되었습니다.', user: fullUserWithoutPassword })
    } else {
      return res.status(200).json({ message: '로그인하지 않은 상태입니다.', user: {} })
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/register', logoutRequired, async (req, res, next) => {
  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (userExist) {
      return res.status(403).json({ code: 'AlreadyExistUser', message: '이미 사용중인 이메일입니다.', });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    const image = await Image.create(req.body.image);
    await user.setImage(image)
    res.status(201).json({ message: '회원가입이 정상적으로 완료되었습니다.' })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/login', logoutRequired, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
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
        }, {
          model: Image,
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

router.patch('/', loginRequired, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } })
    if (!user) {
      return res.status(401).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.', });
    }
    if (req.body.nickname) {
      user.nickname = req.body.nickname
      await user.save();
    }
    if (req.body.image) {
      const image = await Image.create(req.body.image);
      await user.setImage(image)
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
      }, {
        model: Image,
      }]
    })
    return res.status(200).json({ message: '회원정보 수정이 정상적으로 완료되었습니다.', user: fullUserWithoutPassword })
  } catch (error) {
    console.error(error);
    next(error)
  }
})

router.patch('/:userId/follow', loginRequired, async (req, res, next) => {
  try {
    const userTo = parseInt(req.params.userId);
    const user = await User.findOne({ where: { id: userTo } });
    if (!user) {
      return res.status(403).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.' });
    }
    await user.addFollowers(req.user.id);
    return res.status(200).json({ message: '정상적으로 팔로우하였습니다.', UserId: userTo })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:userId/follow', loginRequired, async (req, res, next) => {
  try {
    const userTo = parseInt(req.params.userId);
    const user = await User.findOne({ where: { id: userTo } });
    if (!user) {
      return res.status(403).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.' });
    }
    await user.removeFollowers(req.user.id);
    return res.status(200).json({ message: '정상적으로 언팔로우하였습니다.', UserId: userTo })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/follow/:userId', loginRequired, async (req, res, next) => {
  try {
    const userTo = parseInt(req.params.userId);
    const user = await User.findOne({ where: { id: userTo } });
    if (!user) {
      return res.status(403).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.' });
    }
    await user.removeFollowings(req.user.id);
    return res.status(200).json({ message: '팔로워를 정상적으로 차단하였습니다.', UserId: userTo })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/follow', loginRequired, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.' });
    }
    const followers = await user.getFollowers({
      attributes: ['id', 'email', 'nickname']
    });
    const followings = await user.getFollowings({
      attributes: ['id', 'email', 'nickname']
    });
    return res.status(200).json({ message: '회원정보를 정상적으로 가져왔습니다.', followers, followings })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
