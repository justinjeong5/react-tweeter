import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Form, Input, Button, Space } from 'antd'

import { LOGIN_USER_REQUEST } from '../../reducers/types'

function LoginForm() {

  const dispatch = useDispatch();

  const formLabelCol = useMemo(() => ({ span: 8 }), [])
  const formWrapperCol = useMemo(() => ({ span: 16 }), [])
  const formStyle = useMemo(() => ({ marginTop: 20 }), [])
  const formItemLabelCol = useMemo(() => ({ offset: 8, span: 16 }), [])

  const onFinish = useCallback((values) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
      payload: values
    })
  }, []);

  const formItemEmailRules = useMemo(() => ([
    { required: true, message: '이메일을 입력해주세요.' },
    { type: 'email', message: '이메일의 형식이 올바르지 않습니다.' }
  ]), [])
  const formItemPasswordRules = useMemo(() => ([
    { required: true, message: '비밀번호를 입력해주세요.' },
    { min: 6, message: '비밀번호는 6자리보다 길어야합니다.' }
  ]), [])

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      labelCol={formLabelCol}
      wrapperCol={formWrapperCol}
      style={formStyle}
    >
      <Form.Item
        label="이메일"
        name="email"
        rules={formItemEmailRules}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={formItemPasswordRules}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={formItemLabelCol}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            로그인
        </Button>
          <Button>
            <Link href='/signup'><a>회원가입</a></Link>
          </Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default LoginForm
