import React, { useCallback } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

function ImageToAvatar({ image, userId }) {

  const srcParser = useCallback(() => {
    if (image.src.includes('http://gravatar.com/avatar/')) {
      return image.src
    } else {
      return `http://localhost:3065/${image.src}`
    }
  }, [image])

  const handleRouter = useCallback(() => {
    Router.push(`/user/${userId}`)
  }, [userId])

  return (
    <span style={{ cursor: 'pointer' }} onClick={handleRouter}><Avatar src={srcParser()} /></span>
  )
}

ImageToAvatar.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }),
  userId: PropTypes.number.isRequired
}

export default ImageToAvatar
