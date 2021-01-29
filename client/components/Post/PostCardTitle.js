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
    User: PropTypes.shape({
      nickname: PropTypes.string.isRequired
    }).isRequired,
    Comments: PropTypes.array.isRequired,
    Likers: PropTypes.array.isRequired,
  }).isRequired
}

export default PostCardTitle
