import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { List, AutoSizer } from 'react-virtualized';
import { v4 as uuidv4 } from 'uuid'
import PostCard from './PostCard'

function PostCardVirtualized() {

  const { postsList } = useSelector(state => state.post)
  const rootDivWrapperStyle = useMemo(() => ({ marginTop: 10, height: 'calc(100vh - 175px)' }), [])

  return (
    <div style={rootDivWrapperStyle}>
      <AutoSizer>
        {({ height, width }) => {
          // console.log(postsList);

          const itemsPerRow = 1;
          const rowCount = postsList.length;

          return (
            <div>
              <List
                width={width}
                height={height}
                rowCount={rowCount}
                rowHeight={600}
                rowRenderer={({ index, key, style }) => {
                  const items = [];
                  const fromIndex = index * itemsPerRow;
                  const toIndex = Math.min(fromIndex + itemsPerRow, 100);

                  for (let i = fromIndex; i < toIndex; i++) {
                    postsList.map((post, index) => index === i &&
                      items.push(
                        <PostCard key={uuidv4()} post={post} />
                      )
                    )
                  }

                  return (
                    <div key={key} style={style}>
                      {items}
                    </div>
                  )
                }}
              >
              </List>
            </div>
          )
        }}
      </AutoSizer>
    </div>
  )
}

export default PostCardVirtualized
