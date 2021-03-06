const express = require('express');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { loginRequired } = require('./middleware')

const router = express.Router();

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      order: [
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
    });
    res.status(200).json({ message: '게시글을 정상적으로 가져왔습니다.', post })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/:postId/user', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    const user = await User.findOne({
      where: { id: post.UserId },
      attributes: ['id', 'nickname'],
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
    if (user) {
      const fullUser = user.toJSON();
      fullUser.Posts = fullUser.Posts.length;
      fullUser.Followings = fullUser.Followings.length;
      fullUser.Followers = fullUser.Followers.length;
      return res.status(200).json({ message: '사용자 정보를 정상적으로 가져왔습니다.', user: fullUser })
    } else {
      return res.status(404).json({ code: 'NoSuchUserExist', message: '존재하지 않는 사용자입니다.' })
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.patch('/:postId', loginRequired, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    await Post.update({
      content: req.body.content,
      edit: true,
    }, {
      where: {
        id: postId,
        UserId: req.user.id,
      }
    });
    return res.status(200).json({ message: '게시글을 정상적으로 수정했습니다.', PostId: postId, content: req.body.content })
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/post', loginRequired, async (req, res, next) => {
  try {
    const duplicatedhashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if (duplicatedhashtags) {
      const hashtags = [];
      duplicatedhashtags.forEach(tag => {
        if (hashtags.findIndex(v => v === tag) === -1) {
          hashtags.push(tag);
        }
      })
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() }
      })));
      await post.addHashtags(result.map(res => (res[0])));
    }
    const images = await Promise.all(req.body.imagePaths.map(image => Image.create(image)))
    await post.addImages(images);

    const fullPost = await Post.findOne({ // fullPost does not need Hashtag Info
      where: { id: post.id },
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Image
        }]
      }, {
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User,
        as: 'Likers',
      }]
    })
    return res.status(201).json({ message: '게시글이 정상적으로 등록되었습니다.', post: fullPost })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }
    })
    if (!post) {
      return res.status(403).json({ code: 'NoSuchPostExist', message: '존재하지 않는 게시글입니다.' })
    }
    post.destroy();
    return res.status(200).json({ message: '게시글이 정상적으로 삭제되었습니다.', PostId: post.id })
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
        },
        include: [{
          model: Image
        }]
      }]
    })
    return res.status(201).json({ message: '댓글이 정상적으로 등록되었습니다.', comment: fullComment })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.patch('/:postId/like', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (!post) {
      return res.status(403).json({ code: 'NoSuchPostExist', message: '존재하지 않는 게시글입니다.' })
    }
    await post.addLikers(req.user.id);
    return res.status(200).json({ PostId: post.id, UserId: req.user.id })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId/like', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (!post) {
      return res.status(403).json({ code: 'NoSuchPostExist', message: '존재하지 않는 게시글입니다.' })
    }
    await post.removeLikers(req.user.id);
    return res.status(200).json({ PostId: post.id, UserId: req.user.id })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/:postId/retweet', loginRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.body.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }],
    })
    if (!post) {
      return res.status(403).json({ code: 'NoSuchPostExist', message: '존재하지 않는 게시글입니다.' })
    }
    if (req.user.id === post.UserId || req.user.id === post.Retweet?.UserId) {
      return res.status(403).json({ code: 'NoRetweetRule', message: '자신의 글은 리트윗할 수 없습니다.' })
    }
    const retweetTarget = post.RetweetId || post.id;
    const retweetExist = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTarget
      }
    })
    if (retweetExist) {
      return res.status(403).json({ code: 'NoRetweetRule', message: '이미 리트윗한 게시글입니다.', postId: req.body.postId })
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTarget,
      content: req.body.content,
    })
    const fullRetweet = await Post.findOne({
      where: { id: retweet.id },
      include: [{
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
          model: Comment,
          include: [{
            model: User,
            attributes: ['id']
          }]
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
        include: [{
          model: Image
        }]
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }]
    })
    return res.status(200).json({ message: '정상적으로 리트윗하였습니다.', retweet: fullRetweet })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router;