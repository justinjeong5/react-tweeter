/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Images({ images }) {
  if (images.length === 1) {
    return (
      <>
        <div>
          <Image
            role="presentation"
            width="60%"
            placeholder={(
              <Image
                src={images[0].src}
                width={200}
              />
            )}
            src={images[0].src.replace(/\/thumbnail\//, '/original/')}
            alt={images[0].src}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Image.PreviewGroup>
          <Image
            role="presentation"
            width="60%"
            placeholder={(
              <Image
                src={images[0].src}
                width={200}
              />
            )}
            src={images[0].src.replace(/\/thumbnail\//, '/original/')}
            alt={images[0].src}
          />
          {images.map((image, index) => {
            if (index === 0) {
              return null;
            }
            return <Image key={uuidv4()} src={image.src.replace(/\/thumbnail\//, '/original/')} hidden />;
          })}
        </Image.PreviewGroup>
        <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center' }}>
          <PlusOutlined />
          <br />
          {`${images.length - 1}개의 사진 더 보기 `}
        </div>
      </div>
      {/* role="presentation" is indicator of 'no click needed to get details' for the handicapped */}
    </>
  );
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
  })).isRequired,
};

export default Images;
