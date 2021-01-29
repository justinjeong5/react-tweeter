import React from 'react'
import PropTypes from 'prop-types'
import { List, Comment } from 'antd'
import ImageToAvatar from '../Image/ImageToAvatar'

function Comments({ comments }) {
  return (
    <List
      style={{ marginLeft: 10 }}
      header={`${comments.length}개의 댓글`}
      itemLayout='horizontal'
      dataSource={comments}
      renderItem={(item) => (
        <Comment
          style={{ marginLeft: 20 }}
          author={item.User.nickname}
          avatar={<ImageToAvatar User={item.User} />}
          content={item.content}
        />
      )}
    />
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired
    }),
    content: PropTypes.string.isRequired,
  }))
}

export default Comments
