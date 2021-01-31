import PropTypes from 'prop-types';
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

export const imageSrcParser = (image) => {
  if (image.src.includes('http://gravatar.com/avatar/')) {
    return image.src
  } else {
    return `${config.server_url}/${image.src}`
  }
}

imageSrcParser.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
}