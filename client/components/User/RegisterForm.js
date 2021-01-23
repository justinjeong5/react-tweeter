import React, { useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link';
import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { REGISER_USER } from '../../reducers/types'

function RegisterForm() {

  const dispatch = useDispatch();

  const onFinish = useCallback((values) => {
    dispatch({
      type: REGISER_USER,
      payload: values
    })
  }, []);

  const rootDivWrapperStyle = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 20 }), [])
  const formLabelColStyle = useMemo(() => ({ span: 8 }), [])
  const formWrapperColStyle = useMemo(() => ({ span: 16 }), [])
  const formStyle = useMemo(() => ({ width: '400px' }), [])
  const formEmailRules = useMemo(() => ([
    { required: true, message: '이메일을 입력해주세요.' },
    { type: "email", message: '이메일의 형식이 올바르지 않습니다.' }
  ]), [])
  const formUserNameRules = useMemo(() => ([
    { required: true, message: '이름을 입력해주세요.' },
    { type: "string", max: 20, message: '이름은 20자 이내로 입력해주세요' }
  ]), [])
  const fromPasswordRules = useMemo(() => ([
    { required: true, message: '비밀번호를 입력해주세요.' },
    { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
    { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
    { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }
  ]), [])
  const formPasswordConfirmRules = useMemo(() => ([
    { required: true, message: '비밀번호를 입력해주세요.' },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('비밀번호 확인이 일치하지 않습니다.');
      },
    })
  ]), [])
  const formItemWrapperColStyle = useMemo(() => ({ offset: 8, span: 16 }), [])
  const formItemStyle = useMemo(() => ({ marginTop: -10 }), [])

  return (
    <div style={rootDivWrapperStyle}>
      <Form
        labelCol={formLabelColStyle}
        wrapperCol={formWrapperColStyle}
        name="basic"
        style={formStyle}
        onFinish={onFinish}
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={formEmailRules}
        >
          <Input prefix={<MailOutlined />} placeholder="email" />
        </Form.Item>

        <Form.Item
          label="이름"
          name="userName"
          rules={formUserNameRules}
        >
          <Input prefix={<UserOutlined />} placeholder="name" />
        </Form.Item>

        <Form.Item
          label="비밀번호 "
          name="password"
          rules={fromPasswordRules}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="password" />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="passwordConfirm"
          rules={formPasswordConfirmRules}
        >
          <Input.Password prefix={<CheckSquareOutlined />} placeholder="password check" />
        </Form.Item>

        <Form.Item wrapperCol={formItemWrapperColStyle}>
          <Space >
            <Button type="primary" htmlType="submit">
              회원가입
            </Button>
            <Button>
              취소
            </Button>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={formItemWrapperColStyle} style={formItemStyle}>
          <Link href='/'><a>이미 회원이시라면</a></Link>
        </Form.Item>

      </Form>
    </div >
  )
}

export default RegisterForm;