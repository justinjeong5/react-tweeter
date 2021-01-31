import PropTypes from 'prop-types';
import config from '../../config/config';
const env = process.env.NODE_ENV || 'development';
const { server_url } = config[env];

export const imageSrcParser = (image) => {
  if (image.src.includes('http://gravatar.com/avatar/')) {
    return image.src
  } else {
    return `${server_url}/${image.src}`
  }
}

imageSrcParser.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
}