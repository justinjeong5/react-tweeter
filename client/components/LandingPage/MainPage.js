import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Empty } from 'antd'
import { LOAD_POSTS_REQUEST } from '../../reducers/types'
import AppLayout from '../../components/AppLayout'
import PostForm from '../../components/Post/PostForm'
import PostCard from '../../components/Post/PostCard'

function MainPage({ target, userId }) {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { hasMorePost, postsList, loadPostsLoading, loadPostsDone } = useSelector(state => state.post)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = (document.documentElement
        && document.documentElement.scrollTop)
        || document.body.scrollTop;
      const scrollHeight = (document.documentElement
        && document.documentElement.scrollHeight)
        || document.body.scrollHeight;
      if (hasMorePost && !loadPostsLoading && scrollTop + window.innerHeight + 300 >= scrollHeight) {
        const lastId = postsList[postsList.length - 1]?.id
        const data = {
          lastId,
          target
        }
        if (userId) {
          data.userId = userId;
        }
        dispatch({
          type: LOAD_POSTS_REQUEST,
          data
        })
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePost, loadPostsLoading])

  return (
    <AppLayout>
      {currentUser?.id && <PostForm />}
      {/* <PostCardVirtualized /> using react-virtualized */}
      {loadPostsDone && postsList.length === 0 && <Empty description='해당하는 게시글이 없습니다.' />}
      {postsList.map((post) => (<PostCard key={uuidv4()} post={post} />))}
    </AppLayout>
  )
}



export default MainPage
