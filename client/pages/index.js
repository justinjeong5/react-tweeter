import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/Post/PostForm'
import PostCard from '../components/Post/PostCard'

function index() {

  const { currentUser } = useSelector(state => state.user)
  const { postsList } = useSelector(state => state.post)

  return (
    <AppLayout>
      {currentUser?.id && <PostForm />}
      {postsList.map((post) => (<PostCard key={uuidv4()} post={post} />))}
    </AppLayout>
  )
}

export default index
