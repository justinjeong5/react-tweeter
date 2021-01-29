import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Button, Card, Popover, Popconfirm, message as Message, Typography } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'

import Images from '../Image/Images'
import CommentForm from '../Comment/CommentForm'
import Comments from '../Comment/Comments'
import PostCardContent from './PostCardContent'
import FollowButton from '../Follow/FollowButton'
import RetweetPost from './RetweetPost'
import PostCardTitle from './PostCardTitle'
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../../reducers/types'
import ImageToAvatar from '../Image/ImageToAvatar'

const { Paragraph } = Typography;

function PostCard({ post }) {

  const dispatch = useDispatch();
  const [commentShow, setCommentShow] = useState(false)
  const { removePostLoading, retweetError, message } = useSelector(state => state.post)
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    if (retweetError === post.id) {
      Message.warning(message)
    }
  }, [retweetError])

  const handleLike = useCallback(() => {
    if (currentUser.id) {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: { postId: post.id }
      })
    }
  }, [post, currentUser])

  const handleUnlike = useCallback(() => {
    if (currentUser.id) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: { postId: post.id }
      })
    }
  }, [post, currentUser])

  const handleToggleCommentShow = useCallback(() => {
    setCommentShow(prev => !prev)
  }, [])

  const handleRemovePost = useCallback(() => {
    Message.success('게시글을 삭제하였습니다.');
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        postId: post.id
      }
    })
  }, [post])

  const rootDivWrapperStyle = useMemo(() => ({ marginTop: 20 }), [])
  const liked = useMemo(() => (post.Likers.find((like) => like.id === currentUser.id)), [post]);

  const handleRetweet = useCallback(() => {
    if (!currentUser.id) {
      return Message.warning('리트윗은 로그인이 필요한 기능입니다.')
    }
    if (currentUser.id === post.User.id || currentUser.id === post.Retweet?.UserId) {
      return Message.warning('자신의 글은 리트윗할 수 없습니다.')
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: {
        postId: post.id,
        content: `📨 ${post.User.nickname}님의 게시글을 리트윗하였습니다.`
      }
    })
  }, [currentUser])

  return (
    <div style={rootDivWrapperStyle}>
      <Card
        cover={post.Images.length && <Images images={post.Images} />}
        actions={[
          <RetweetOutlined key={uuidv4()} onClick={handleRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor='#eb2f96' key={uuidv4()} onClick={handleUnlike} />
            : <HeartOutlined key={uuidv4()} onClick={handleLike} />,
          <MessageOutlined key={uuidv4()} onClick={handleToggleCommentShow} />,
          <Popover key={uuidv4()} content={(
            <Button.Group>
              {currentUser.id === post.User.id
                ? <>
                  <Button>수정</Button>
                  <Popconfirm
                    title="게시글을 정말로 삭제하시겠습니까?"
                    onConfirm={handleRemovePost}
                    okText="삭제"
                    cancelText="아니오"
                  >
                    <Button type='danger' disabled={removePostLoading} loading={removePostLoading} >삭제</Button>
                  </Popconfirm>
                </>
                : <Button>신고</Button>}
              <Button><Paragraph copyable={{ text: `http://localhost:3000/post/${post.id}` }}>링크</Paragraph> </Button>
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
        extra={currentUser.id && post.User.id !== currentUser.id && <FollowButton User={post.User} />}
      >
        <Card.Meta
          avatar={<ImageToAvatar User={post.User} />}
          title={<PostCardTitle post={post} />}
          description={<PostCardContent content={post.content} />}
        />
        {post.Retweet && <RetweetPost post={post.Retweet} />}
      </Card >
      {commentShow && <>
        <CommentForm postId={post.id} />
        <Comments comments={post.Comments} />
      </>}
    </div >
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      Image: PropTypes.shape({
        src: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired
    })).isRequired,
    Comments: PropTypes.arrayOf(PropTypes.shape({
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
        Image: PropTypes.shape({
          src: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    Likers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired,
    Retweet: PropTypes.shape({
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        Image: PropTypes.shape({
          src: PropTypes.string.isRequired
        }).isRequired
      }).isRequired,
      content: PropTypes.string.isRequired,
      Images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired
      })).isRequired,
      Comments: PropTypes.array.isRequired,
    }),
  }).isRequired
}

export default PostCard
