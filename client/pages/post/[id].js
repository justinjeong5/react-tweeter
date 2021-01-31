import React from 'react'
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import Head from 'next/head'
import axios from 'axios';
import { Empty } from 'antd'

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout'
import PostCard from '../../components/Post/PostCard'
import UserProfile from '../../components/User/UserProfile'
import { LOAD_POST_REQUEST, LOAD_POST_USER_REQUEST } from '../../reducers/types';
import config from '../../config/config';
const env = process.env.NODE_ENV || 'development';
const { server_url, client_url } = config[env];

function Post() {

  const router = useRouter();
  const { id } = router.query;
  const { otherUser, loadUserDone } = useSelector(state => state.user)
  const { singlePost } = useSelector(state => state.post)

  return (
    <>
      {singlePost &&
        <Head>
          <title>{singlePost.User.nickname}님의 글</title>
          <meta name="description" content={`${singlePost.User.nickname}님의 트위터`} />
          <meta property="og:title" content={singlePost.content} />
          <meta property="og:description" content={singlePost.content} />
          <meta property="og:image" content={singlePost.Images[0]
            ? `${server_url}/${singlePost.Images[0].src}`
            : singlePost.User.Image.src} />
          <meta property="og:url" content={`${client_url}/post/${id}`} />
        </Head>}
      <AppLayout
        DefaultProfile={loadUserDone && <UserProfile User={otherUser} />}
        option={true}
      >
        {!singlePost && <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 48px)' }}>
            <Empty description='존재하지 않는 게시글입니다.' />
          </div>
        </>}
        {singlePost && <PostCard post={singlePost} />}
      </AppLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  axios.defaults.headers.Cookie = '';
  const cookie = context.req ? context.req.headers.cookie : '';
  if (cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: {
      postId: context.params.id
    }
  })
  context.store.dispatch({
    type: LOAD_POST_USER_REQUEST,
    data: {
      postId: context.params.id
    }
  })

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})

export default Post
