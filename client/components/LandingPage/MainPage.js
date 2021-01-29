import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Empty } from 'antd'
import AppLayout from '../../components/AppLayout'
import PostForm from '../../components/Post/PostForm'
import PostCard from '../../components/Post/PostCard'
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/types'

function MainPage({ payload }) {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { loadPostsLoading, loadPostsDone } = useSelector(state => state.post)
  const { hasMorePost, postsList } = useSelector(state => state.posts)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = (document.documentElement
        && document.documentElement.scrollTop)
        || document.body.scrollTop;
      const scrollHeight = (document.documentElement
        && document.documentElement.scrollHeight)
        || document.body.scrollHeight;
      if (hasMorePost && !loadPostsLoading && scrollTop + window.innerHeight + 300 >= scrollHeight) {
        const data = {
          lastId: postsList[postsList.length - 1].id,
        }
        if (payload.action === LOAD_USER_POSTS_REQUEST) {
          data.userId = payload.userId
        }
        dispatch({
          type: payload.action,
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
