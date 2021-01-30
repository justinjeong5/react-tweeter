import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Input, Button, Space, Popconfirm } from 'antd'
import { EDIT_POST_REQUEST } from '../../reducers/types'

function PostCardContent({ content, postId, editMode, handleEdit }) {

  const dispatch = useDispatch();
  const [text, setText] = useState(content)
  const handleText = useCallback((e) => {
    setText(e.target.value);
  }, [])

  const handleFinish = useCallback(() => {
    dispatch({
      type: EDIT_POST_REQUEST,
      data: {
        postId,
        content: text
      }
    })
  }, [postId, text])

  return (<>
    {editMode
      ? (<>
        <Input.TextArea
          style={{ margin: '0 0 10px' }}
          value={text}
          onChange={handleText}
        />
        <Space style={{ float: 'right' }}>
          <Popconfirm
            title="게시글을 수정하시겠습니까?"
            onConfirm={handleFinish}
            okText="수정"
            cancelText="아니오"
          >
            <Button type='primary'>수정</Button>
          </Popconfirm>
          <Button onClick={handleEdit} type='danger'>취소</Button>
        </Space>
      </>)
      : (<>
        {content.split(/(#[^\s#]+)/g).map(v => {
          if (v.match(/(#[^\s#]+)/g)) {
            return <Link key={uuidv4()} href={`/hashtag/${v.slice(1).toLowerCase()}`}><a>{v}</a></Link>
          }
          return v
        })}
      </>)
    }
  </>)
}

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
  postId: PropTypes.number,
  editMode: PropTypes.bool,
  handleEdit: PropTypes.func,
}

PostCardContent.defaultProps = {
  editMode: false
}

export default PostCardContent
