import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Form, Input, Button, Space } from 'antd'
import PropTypes from 'prop-types'

function LoginForm({ setLogin }) {

  const formLabelCol = useMemo(() => ({ span: 8 }), [])
  const formWrapperCol = useMemo(() => ({ span: 16 }), [])
  const formStyle = useMemo(() => ({ marginTop: 20 }), [])
  const formItemLabelCol = useMemo(() => ({ offset: 8, span: 16 }), [])

  const onFinish = useCallback((values) => {
    console.log(values);
    setLogin(true)
  }, []);

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
        rules={[{ required: true, message: '이메일을 입력해주세요.' },
        { type: 'email', message: '이메일의 형식이 올바르지 않습니다.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
        { min: 6, message: '비밀번호는 6자리보다 길어야합니다.' }]}
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

LoginForm.propTypes = {
  setLogin: PropTypes.func.isRequired,
}


export default LoginForm
