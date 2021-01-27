import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, Avatar, Popconfirm, message as Message } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST, BLOCK_FOLLOW_REQUEST } from '../../reducers/types'

function FollowList({ header, data }) {

  const dispatch = useDispatch();

  const handleBlock = useCallback((user) => () => {
    if (header === '내가 팔로우 하는 사람') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: { userId: user.id }
      })
    } else {
      dispatch({
        type: BLOCK_FOLLOW_REQUEST,
        data: { userId: user.id }
      })
      Message.success(`${user.nickname}님이 차단되었습니다.`)
    }
  }, [])

  const listRenderItem = useCallback(() => (item) => (
    <List.Item style={{ marginTop: 20 }}>
      <List.Item.Meta
        avatar={<Avatar>{item.nickname[0]}</Avatar>}
        title={item.nickname}
        description={item.email}
      />
      {header === '내가 팔로우 하는 사람'
        ? <div><StopOutlined onClick={handleBlock(item)} /></div>
        : <Popconfirm
          placement="topRight"
          title={`${item.nickname}님을 차단하시겠습니까? \n이 작업은 되돌릴 수 없습니다.`}
          onConfirm={handleBlock(item)}
          okText='차단'
          cancelText="아니오"
        >
          <StopOutlined />
        </Popconfirm>
      }
    </List.Item>
  ), [])


  const listStyle = useMemo(() => ({ marginBottom: 20 }), [])

  return (
    <List
      style={listStyle}
      header={header}
      bordered
      dataSource={data}
      renderItem={listRenderItem()}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList
