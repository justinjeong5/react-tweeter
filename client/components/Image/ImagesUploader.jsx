import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message as Message } from 'antd';
import { UPLOAD_IMAGES_REQUEST } from '../../reducers/types';

function ImagesUploader() {
  const imageUploadRef = useRef();
  const dispatch = useDispatch();
  const { uploadImagesLoading, uploadImagesError, message } = useSelector((state) => state.post);

  useCallback(() => {
    if (uploadImagesError) {
      Message.error(message);
    }
  }, [uploadImagesError]);

  const handleImageUpload = useCallback(() => {
    imageUploadRef.current.click();
  }, []);

  const handleChangeImage = useCallback((e) => {
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
      // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
    });
  }, []);

  return (
    <>
      <Button onClick={handleImageUpload} disabled={uploadImagesLoading}>이미지 업로드</Button>
      <input type="file" name="image" multiple hidden ref={imageUploadRef} onChange={handleChangeImage} />
    </>
  );
}

export default ImagesUploader;
