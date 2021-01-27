const express = require('express');
const { Op } = require('sequelize')

const { Post, Comment, Image, User } = require('../models')
const { loginRequired } = require('./middleware')

const router = express.Router();

router.get('/posts', loginRequired, async (req, res, next) => {
  try {
    const where = {};
    const lastId = parseInt(req.query.lastId, 10);
    console.log(lastId);
    if (lastId) {
      where.id = { [Op.lt]: lastId }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }]
    });
    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }

})
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

router.post('/:postId/comment', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (!post) {
      return res.status(403).json({ code: 'NoSuchPostExist', message: '존재하지 않는 게시글입니다.' })
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: {
          attributes: ['id', 'nickname'],
        }
      }]
    })
    return res.status(201).json({ message: '댓글이 정상적으로 등록되었습니다.', comment: fullComment })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router;