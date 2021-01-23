import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'

function CommentForm({ postId }) {

  const { currentUser } = useSelector(state => state.user)

  const handleFinish = useCallback((values) => {
    console.log(values);
    console.log(currentUser, postId);
  }, [])

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name='comment' style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} />
        <Button
          type='primary'
          htmlType='submit'
          style={{ position: 'absolute', right: 0, bottom: -40 }}
        >Tweet</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired
}

export default CommentForm
