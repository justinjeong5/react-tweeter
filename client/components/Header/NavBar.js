import React from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import { TwitterOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons'

function NavBar() {

  return (
    <Menu mode="horizontal">
      <Menu.Item key="homeMenu" icon={<TwitterOutlined />}>
        <Link href='/'><a>트위터</a></Link>
      </Menu.Item>
      <Menu.Item key="profileMenu" icon={<MailOutlined />}>
        <Link href='/profile'><a>프로필</a></Link>
      </Menu.Item>
      <Menu.Item key="signupMenu" icon={<AppstoreOutlined />}>
        <Link href='/signup'><a>회원가입</a></Link>
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
