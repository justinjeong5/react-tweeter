import React, { useCallback, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { ADD_POST_REQUEST } from '../../reducers/types';

const { useForm } = Form;

function PostForm() {

  const dispatch = useDispatch();
  const [form] = useForm();
  const imageUploadRef = useRef();
  const { imagePaths, addPostDone } = useSelector(state => state.post)

  const handleFinish = useCallback((values) => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: values.content,
      }
    })
  }, [])

  useEffect(() => {
    form.resetFields();
  }, [addPostDone])

  const handleImageUpload = useCallback(() => {
    imageUploadRef.current.click();
  }, [])

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item name='content'>
        <Input.TextArea
          maxLength={140}
          placeholder='오늘의 이야기를 여러 사람들과 공유해 주세요'
        />
      </Form.Item>
      <Button type='primary' style={{ float: 'right' }} htmlType='submit'>Tweet</Button>
      <div>
        <input type='file' multiple hidden ref={imageUploadRef} />
        <Button onClick={handleImageUpload}>이미지 업로드</Button>
      </div>
      <div>
        {imagePaths.map((value) => (
          <div key={uuidv4()} style={{ display: 'inline-block' }}>
            <img src={value} style={{ width: 200 }} alt={value} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form >
  )
}

export default PostForm
