import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

function ImageToAvatar({ image }) {

  const srcParser = useCallback(() => {
    if (image.src.includes('http://gravatar.com/avatar/')) {
      return image.src
    } else {
      return `http://localhost:3065/${image.src}`
    }
  }, [image])

  return (
    <Avatar src={srcParser()} />
  )
}

ImageToAvatar.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  })
}

export default ImageToAvatar
