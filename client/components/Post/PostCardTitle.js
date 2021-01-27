import React from 'react'
import PropTypes from 'prop-types'

function PostCardTitle({ post }) {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {post.User.nickname}
      <span style={{ color: 'gray', fontSize: '0.8em', fontWeight: 300 }}>
        {post.Likers.length > 0 && `👍🏻 ${post.Likers.length}`} {post.Comments.length > 0 && `📝 ${post.Comments.length}`}
      </span>
    </div>
  )
}

PostCardTitle.propTypes = {
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

export default PostCardTitle
