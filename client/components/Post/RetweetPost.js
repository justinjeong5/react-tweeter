import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import PostCardContent from './PostCardContent'
import PostCardTitle from './PostCardTitle'
import Images from '../Image/Images'
import ImageToAvatar from '../Image/ImageToAvatar'

function RetweetPost({ post }) {

  return (
    <div style={{ marginTop: 20 }}>
      <Card
        cover={post.Images.length && <Images images={post.Images} />}
      >
        <Card.Meta
          avatar={<ImageToAvatar User={post.User} />}
          title={<PostCardTitle post={post} />}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
    </div >
  )
}

RetweetPost.propTypes = {
  post: PropTypes.shape({
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
  }).isRequired
}

export default RetweetPost
