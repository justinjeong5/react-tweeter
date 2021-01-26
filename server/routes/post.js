const express = require('express');

const { Post, Image, User } = require('../models')
const { loginRequired } = require('./middleware')

const router = express.Router();

router.post('/post', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      }, {
        model: Image,
      }, {
        model: Post,
        as: 'Retweet'
      }]
    })
    return res.status(201).json({ message: '게시글이 정상적으로 등록되었습니다.', post: fullPost })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router;