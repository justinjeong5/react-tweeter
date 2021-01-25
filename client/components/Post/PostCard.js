import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Popover, Avatar } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'

import Images from '../Image/Images'
import CommentForm from '../Comment/CommentForm'
import Comments from '../Comment/Comments'
import PostCardContent from './PostCardContent'
import { REMOVE_POST_REQUEST } from '../../reducers/types'

function PostCard({ post }) {

  const dispatch = useDispatch();
  const [like, setLike] = useState(false)
  const [commentShow, setCommentShow] = useState(false)
  const { removePostLoading } = useSelector(state => state.post)
  const { currentUser } = useSelector(state => state.user)

  const handleTogleLike = useCallback(() => {
    setLike(prev => !prev)
  }, [])

  const handleToggleCommentShow = useCallback(() => {
    setCommentShow(prev => !prev)
  }, [])

  const handleRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        id: post.id
      }
    })
  }, [post])

  const rootDivWrapperStyle = useMemo(() => ({ marginTop: 20 }), [])

  return (
    <div style={rootDivWrapperStyle}>
      <Card
        cover={post.Images.length && <Images images={post.Images} />}
        actions={[
          <RetweetOutlined key={uuidv4()} />,
          like
            ? <HeartTwoTone twoToneColor='#eb2f96' key={uuidv4()} onClick={handleTogleLike} />
            : <HeartOutlined key={uuidv4()} onClick={handleTogleLike} />,
          <MessageOutlined key={uuidv4()} onClick={handleToggleCommentShow} />,
          <Popover key={uuidv4()} content={(
            <Button.Group>
              {currentUser.id === post.User.id
                ? <>
                  <Button>수정</Button>
                  <Button type='danger' disabled={removePostLoading} loading={removePostLoading} onClick={handleRemovePost}>삭제</Button>
                </>
                : <Button>신고</Button>}
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {commentShow && <>
        <CommentForm postId={post.id} />
        <Comments comments={post.Comments} />
      </>}
    </div >
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  })
}

export default PostCard
