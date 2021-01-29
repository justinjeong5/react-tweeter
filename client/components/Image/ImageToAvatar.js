import React, { useCallback } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import { imageSrcParser } from '../utils/ImageSrcParser'

function ImageToAvatar({ image, userId }) {

  const handleRouter = useCallback(() => {
    Router.push(`/user/${userId}`)
  }, [userId])

  return (
    <span style={{ cursor: 'pointer' }} onClick={handleRouter}><Avatar src={imageSrcParser(image)} /></span>
  )
}

ImageToAvatar.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }),
  userId: PropTypes.number.isRequired
}

export default ImageToAvatar
