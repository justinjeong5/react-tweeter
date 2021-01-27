import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Button, Card, Popover, Avatar, Popconfirm, message as Message } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'

import Images from '../Image/Images'
import CommentForm from '../Comment/CommentForm'
import Comments from '../Comment/Comments'
import PostCardContent from './PostCardContent'
import FollowButton from '../Follow/FollowButton'
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/types'

function PostCard({ post }) {

  const dispatch = useDispatch();
  const [commentShow, setCommentShow] = useState(false)
  const { removePostLoading } = useSelector(state => state.post)
  const { currentUser } = useSelector(state => state.user)

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
  const titleContent = useCallback(() => {
    if (post.Likers.length) {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {post.User.nickname}
          <span style={{ color: 'gray', fontSize: '0.8em', fontWeight: 300 }}>
            👍🏻 {post.Likers.length}
          </span>
        </div>
      )
    } else {
      return (post.User.nickname)
    }
  }, [post])

  return (
    <div style={rootDivWrapperStyle}>
      <Card
        cover={post.Images.length && <Images images={post.Images} />}
        actions={[
          <RetweetOutlined key={uuidv4()} />,
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
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
        extra={currentUser.id && post.User.id !== currentUser.id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={titleContent()}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {
        commentShow && <>
          <CommentForm postId={post.id} />
          <Comments comments={post.Comments} />
        </>
      }
    </div >
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired
    }),
    content: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired
    })),
    Comments: PropTypes.arrayOf(PropTypes.shape({
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired
      }),
      content: PropTypes.string.isRequired,
    })),
    Likers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })),
  })
}

export default PostCard
