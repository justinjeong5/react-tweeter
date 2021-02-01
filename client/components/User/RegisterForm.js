import React, { useMemo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button, Space, message as Message, Popconfirm } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CheckSquareOutlined } from '@ant-design/icons';
import md5 from 'md5'
import { REGISTER_USER_REQUEST, REMOVE_IMAGE_FROM_PATH } from '../../reducers/types'
import ImageUploader from '../Image/ImageUploader';

function RegisterForm() {

  const dispatch = useDispatch();
  const { currentUser, registerUserLoading, registerUserDone, registerUserError, message } = useSelector(state => state.user)
  const { imagePath } = useSelector(state => state.image)

  useEffect(() => {
    if (currentUser.id) {
      Router.replace('/');
      return Message.warning('로그인 하지 않은 사용자만 접근할 수 있습니다.', 1000)
    }
  }, [currentUser])

  useEffect(() => {
    if (registerUserDone) {
      Router.push('/')
      Message.success('회원가입이 완료되었습니다.')
    }
  }, [registerUserDone])

  useEffect(() => {
    if (registerUserError) {
      Message.error(message)
    }
  }, [registerUserError])

  const onFinish = useCallback((values) => {
    const defaultImage = `https://gravatar.com/avatar/${md5(values.email)}?d=identicon`
    dispatch({
      type: REGISTER_USER_REQUEST,
      data: {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        image: imagePath || { src: defaultImage }
      }
    })
  }, [imagePath]);

  const handleRemoveImage = useCallback(() => () => {
    dispatch({
      type: REMOVE_IMAGE_FROM_PATH,
    })
  }, [])


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
          name="nickname"
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
          {imagePath && <div style={{ marginBottom: 25 }}>
            <Popconfirm
              placement="bottom"
              title='사진을 삭제하시겠습니까?'
              onConfirm={handleRemoveImage()}
              okText='삭제'
              cancelText='아니오'>
              <img
                style={{ width: 266 }}
                src={imagePath.src}
                alt={imagePath.src}
              />
            </Popconfirm>
          </div>}
          <Space >
            <ImageUploader />
            <Button type="primary" htmlType="submit" disabled={registerUserLoading} loading={registerUserLoading}>
              회원가입
            </Button>
            <Button disabled={registerUserLoading} >
              취소
            </Button>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={formItemWrapperColStyle} style={formItemStyle}>
          <Link disabled={registerUserLoading} href='/'><a>이미 회원이시라면</a></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm;