import PropTypes from 'prop-types';

export const imageSrcParser = (image) => {
  if (image.src.includes('http://gravatar.com/avatar/')) {
    return image.src
  } else {
    return `http://localhost:3065/${image.src}`
  }
}

imageSrcParser.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
}