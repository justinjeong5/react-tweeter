import React from 'react'
import PropTypes from 'prop-types'

function PostCard({ post }) {
  return (
    <div>
      PostCard
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.exact({
    id: PropTypes.number.isRequired,
    User: PropTypes.exact({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired
    }),
    content: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string.isRequired
    })),
    Comments: PropTypes.arrayOf(PropTypes.exact({
      User: PropTypes.exact({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired
      }),
      content: PropTypes.string.isRequired,
    })),
  })
}

export default PostCard
