import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { LOAD_POSTS_REQUEST, LOAD_CURRENT_USER_REQUEST } from '../reducers/types'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/Post/PostForm'
import PostCard from '../components/Post/PostCard'

function index() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { hasMorePost, postsList, loadPostsLoading } = useSelector(state => state.post)

  useEffect(() => {
    dispatch({
      type: LOAD_CURRENT_USER_REQUEST
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { lastId: null }
    })
  }, [])

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
        dispatch({
          type: LOAD_POSTS_REQUEST,
          data: { lastId }
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
      {postsList.map((post) => (<PostCard key={uuidv4()} post={post} />))}
    </AppLayout>
  )
}

export default index
