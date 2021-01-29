const express = require('express');
const { Op } = require('sequelize');

const { Post, Comment, Image, User } = require('../models');
const { loginRequired } = require('./middleware')

const router = express.Router();

const postsVariables = {    // where should be included when uses
  limit: 10,
  order: [
    ['createdAt', 'DESC'],
    [Comment, 'createdAt', 'DESC']
  ],
  include: [{
    model: User,
    attributes: ['id', 'nickname'],
    include: [{
      model: Image
    }]
  }, {
    model: Image
  }, {
    model: Comment,
    include: [{
      model: User,
      attributes: ['id', 'nickname'],
      include: [{
        model: Image
      }]
    }]
  }, {
    model: User,
    as: 'Likers',
    attributes: ['id'],
  }, {
    model: Post,
    as: 'Retweet',
    include: [{
      model: User,
      attributes: ['id', 'nickname'],
      include: [{
        model: Image
      }]
    }, {
      model: Image
    }, {
      model: User,
      as: 'Likers',
      attributes: ['id']
    }, {
      model: Comment,
      attributes: ['id']
    }]
  }]
}

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where.id = { [Op.lt]: lastId }
    }
    postsVariables.where = where;
    const posts = await Post.findAll(postsVariables);

    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/follower', loginRequired, async (req, res, next) => {
  try {
    const followers = await User.findAll({
      attributes: ['id'],
      include: [{
        model: User,
        as: 'Followings',
        where: { id: req.user.id },
      }],
    })

    const where = { UserId: { [Op.in]: followers.map(user => user.id) } };
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where.id = { [Op.lt]: lastId }
    }
    postsVariables.where = where;
    const posts = await Post.findAll(postsVariables);

    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/following', loginRequired, async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ['id'],
      include: [{
        model: User,
        as: 'Followers',
        where: { id: req.user.id },
      }],
    })

    const where = { UserId: { [Op.in]: followings.map(user => user.id) } };
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where.id = { [Op.lt]: lastId }
    }
    postsVariables.where = where;
    const posts = await Post.findAll(postsVariables);

    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/user/:userId/', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where.id = { [Op.lt]: lastId }
    }
    postsVariables.where = where;
    const posts = await Post.findAll(postsVariables);

    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;