import React, { useCallback, useState, useMemo } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Menu, Input } from 'antd'
import { TwitterOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

function NavBar() {

  const { loadPostsLoading } = useSelector(state => state.posts)
  const [searchInput, setSearchInput] = useState('')
  const handleSearchInput = useCallback((e) => {
    setSearchInput(e.target.value.trim());
  }, [])

  const handleSearch = useCallback(() => {
    if (!searchInput) return;
    if (searchInput) {
      Router.push(`/hashtag/${searchInput}`)
    }
  }, [searchInput])

  const searchStyle = useMemo(() => ({ verticalAlign: 'middle', width: '25vw' }), [])

  return (
    <Menu mode="horizontal">
      <Menu.Item key="homeMenu" icon={<TwitterOutlined />}>
        <Link href='/'><a>트위터</a></Link>
      </Menu.Item>
      <Menu.Item key="profileMenu" icon={<MailOutlined />}>
        <Link href='/profile'><a>프로필</a></Link>
      </Menu.Item>
      <Menu.Item>
        <Input.Search
          maxLength={20}
          minLength={1}
          style={searchStyle}
          prefix='#'
          placeholder='해시태그'
          enterButton
          value={searchInput}
          onChange={handleSearchInput}
          onSearch={handleSearch}
          loading={loadPostsLoading}
          disabled={loadPostsLoading}
        />
      </Menu.Item>
      <Menu.Item key="signupMenu" icon={<AppstoreOutlined />} style={{ float: 'right' }}>
        <Link href='/signup'><a>회원가입</a></Link>
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
