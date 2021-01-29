import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, Popconfirm, message as Message, Space, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST, BLOCK_FOLLOW_REQUEST } from '../../reducers/types'
import { useRouter } from 'next/router'
import ImageToAvatar from '../Image/ImageToAvatar'

function FollowList({ header, data }) {

  const dispatch = useDispatch();
  const router = useRouter();

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
      Message.success(`${user.nickname}님을 언팔로우하였습니다.`)
    }
  }, [])

  const handleCollect = useCallback((id) => () => {
    router.push(`/user/${id}`)
  }, [])

  const listRenderItem = useCallback(() => (item) => (
    <List.Item style={{ marginTop: 20 }}>
      <List.Item.Meta
        avatar={<ImageToAvatar User={item} />}
        title={item.nickname}
        description={item.email}
      />
      <Space>
        <Button onClick={handleCollect(item.id)}>모아보기</Button>
        <Popconfirm
          placement="topRight"
          title={`${item.nickname}님을 언팔로우 하시겠습니까? \n이 작업은 되돌릴 수 없습니다.`}
          onConfirm={handleBlock(item)}
          okText='언팔로우'
          cancelText="아니오"
        >
          <StopOutlined />
        </Popconfirm>
      </Space>
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
