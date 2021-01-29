const express = require('express');
const { Op } = require('sequelize');

const { Post, Comment, Image, User, Hashtag } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => {
  try {
    const where = {};
    const lastId = parseInt(req.query.lastId, 10);
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
        model: Hashtag,
        where: { name: decodeURI(req.params.hashtag) },
      }, {
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
    });

    res.status(200).json({ message: '게시글 목록을 정상적으로 가져왔습니다.', posts })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;