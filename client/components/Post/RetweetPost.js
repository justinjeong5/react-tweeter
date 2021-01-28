import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'

import PostCardContent from './PostCardContent'
import PostCardTitle from './PostCardTitle'
import Images from '../Image/Images'

function RetweetPost({ post }) {

  return (
    <div style={{ marginTop: 20 }}>
      <Card
        cover={post.Images.length && <Images images={post.Images} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={<PostCardTitle post={post} />}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
    </div >
  )
}

RetweetPost.propTypes = {
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
      id: PropTypes.number.isRequired,
    })),
    Likers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })),
  })
}

export default RetweetPost