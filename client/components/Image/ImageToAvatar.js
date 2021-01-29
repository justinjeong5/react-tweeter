import React, { useCallback } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import { imageSrcParser } from '../utils/ImageSrcParser'

function ImageToAvatar({ User }) {

  const handleRouter = useCallback(() => {
    Router.push(`/user/${User.id}`)
  }, [User])

  return (
    <span style={{ cursor: 'pointer' }} onClick={handleRouter}><Avatar src={imageSrcParser(User.Image)} /></span>
  )
}

ImageToAvatar.propTypes = {
  User: PropTypes.shape({
    id: PropTypes.number.isRequired,
    Image: PropTypes.shape({
      src: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired
}

export default ImageToAvatar
