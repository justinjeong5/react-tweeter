import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button, Popconfirm, message as Message } from 'antd'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE_FROM_PATHS } from '../../reducers/types';

const { useForm } = Form;

function PostForm() {

  const dispatch = useDispatch();
  const [form] = useForm();
  const imageUploadRef = useRef();
  const { imagePaths, addPostDone, addPostLoading } = useSelector(state => state.post)

  const handleFinish = useCallback((values) => {
    if (!values.content?.trim()) {
      return;
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: values.content,
        imagePaths
      }
    })
  }, [imagePaths])

  useEffect(() => {
    if (addPostDone) {
      form.resetFields();
      Message.success('게시글을 등록하였습니다.')
    }
  }, [addPostDone])

  const handleImageUpload = useCallback(() => {
    imageUploadRef.current.click();
  }, [])

  const handleChangeImage = useCallback((e) => {
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file)
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData     // FormData should not be wrapped by {}, which makes FormData into plain JSON object.
    })
  }, [])

  const handleRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE_FROM_PATHS,
      data: index
    })
  }, [])

  return (
    <div>
      <Form
        style={{ margin: '10px 0 20px' }}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item name='content'>
          <Input.TextArea
            maxLength={140}
            rows={4}
            showCount
            placeholder='오늘의 이야기를 여러 사람들과 공유해 주세요'
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleImageUpload} disabled={addPostLoading}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit' disabled={addPostLoading} loading={addPostLoading} >Tweet</Button>
        </Form.Item>
      </Form >

      <input type='file' name='image' multiple hidden ref={imageUploadRef} onChange={handleChangeImage} />
      <div style={{ display: 'flex', overflowX: 'scroll' }}>
        {imagePaths.map((value, index) => (
          <div key={uuidv4()}>
            <Popconfirm
              placement="bottom"
              title='사진을 삭제하시겠습니까?'
              onConfirm={handleRemoveImage(index)}
              okText='삭제'
              cancelText='아니오'>
              <img
                style={{ height: '15vw', maxHeight: 220 }}
                src={`http://localhost:3065/${value.src}`}
                alt={value.src}
              />
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostForm
