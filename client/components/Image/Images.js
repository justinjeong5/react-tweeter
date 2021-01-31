import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

function Images({ images }) {

  if (images.length === 1) {
    return (<>
      <div>
        <Image role="presentation" width='60%' src={`${config.server_url}/${images[0].src}`} alt={images[0].src} />
      </div>
    </>)
  }

  return (<>
    <div style={{ display: 'flex' }}>
      <Image.PreviewGroup>
        <Image role="presentation" width='60%' src={`${config.server_url}/${images[0].src}`} alt={images[0].src} />
        {images.map((image, index) => {
          if (index !== 0) return <Image key={uuidv4()} src={`${config.server_url}/${image.src}`} hidden />
        })}
      </Image.PreviewGroup>
      <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center' }}>
        <PlusOutlined /><br />
        {`${images.length - 1}개의 사진 더 보기 `}
      </div>
    </div>
    {/* role="presentation" is indicator of 'no click needed to get details' for the handicapped */}
  </>)
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired
  })).isRequired
}

export default Images
