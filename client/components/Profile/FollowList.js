import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST } from '../../reducers/types'

function FollowList({ header, data }) {

  console.log(header)
  const dispatch = useDispatch();

  const handleBlock = useCallback((user) => () => {
    if (header === '내가 팔로우 하는 사람') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: { userId: user.id }
      })
    } else {
      console.log(user, 'you are blocked!')
    }
  }, [])

  const listRenderItem = useCallback(() => (item) => (
    <List.Item style={{ marginTop: 20 }}>
      <List.Item.Meta
        avatar={<Avatar>{item.nickname[0]}</Avatar>}
        title={item.nickname}
        description={item.email}
      />
      <div><StopOutlined onClick={handleBlock(item)} /></div>
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
