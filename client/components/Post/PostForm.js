import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { ADD_POST } from '../../reducers/types';

function PostForm() {

  const dispatch = useDispatch();
  const { imagePaths } = useSelector(state => state.post)

  const handleFinish = useCallback((values) => {
    console.log(values);
    dispatch({
      type: ADD_POST
    })
  }, [])

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={handleFinish}
    >
      <Input.TextArea
        name='content'
        maxLength={140}
        placeholder='오늘의 이야기를 여러 사람들과 공유해 주세요'
      />
      <div>
        <input type='file' multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type='primary' style={{ float: 'right' }} htmlType='submit'>Tweet</Button>
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
