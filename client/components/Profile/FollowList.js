import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { List, Card, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'

function FollowList({ header, data }) {

  const [dataList, setDataList] = useState([])
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0)
  const [noMoreData, setNoMoreData] = useState(false)

  useEffect(() => {
    appendData();
  }, [])

  const appendData = useCallback(() => {
    if (!noMoreData) {
      setDataList([...dataList, ...data.slice(skip, skip + limit)]);
      setSkip(skip + limit);
      if (skip + limit > data.length) {
        setNoMoreData(true);
      }
    }
  }, [skip, limit, dataList, noMoreData])

  const listRenderItem = useCallback((item) => (
    <List.Item style={listRenderItemCardStyle}>
      <Card
        cover={<img src={item.image} alt={item.nickname} style={listRenderItemImageStyle} />}
        actions={[<StopOutlined key='stop' />]}
      >
        <Card.Meta description={item.nickname} />
      </Card>
    </List.Item>
  ), [])

  const listRenderItemImageStyle = useMemo(() => ({ width: 200 }), [])
  const listStyle = useMemo(() => ({ marginBottom: 20, }), [])
  const listGridOption = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), [])
  const listLoadMoreDivStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }), [])
  const listRenderItemCardStyle = useMemo(() => ({ marginTop: 20 }), [])

  return (
    <List
      style={listStyle}
      grid={listGridOption}
      header={<div>{header}</div>}
      loadMore={<div style={listLoadMoreDivStyle}><Button onClick={appendData} disabled={noMoreData} >더보기</Button></div>}
      bordered
      dataSource={dataList}
      renderItem={listRenderItem}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList
