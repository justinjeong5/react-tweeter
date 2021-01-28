import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message as Message } from 'antd'
import { UPLOAD_IMAGE_REQUEST } from '../../reducers/types'

function ImageUploader() {

  const imageUploadRef = useRef();
  const dispatch = useDispatch();
  const { uploadImageLoading, uploadImageError, message } = useSelector(state => state.post)

  useCallback(() => {
    if (uploadImageError) {
      Message.error(message)
    }
  }, [uploadImageError])

  const handleChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0])

    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData     // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
    })
  }, [])

  const handleImageUpload = useCallback(() => {
    imageUploadRef.current.click();
  }, [])

  return (
    <>
      <Button onClick={handleImageUpload} disabled={uploadImageLoading}>이미지 업로드</Button>
      <input type='file' name='image' hidden ref={imageUploadRef} onChange={handleChangeImage} />
    </>
  )
}

export default ImageUploader
