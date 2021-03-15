/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Input, Button, Drawer } from 'antd';
import { MenuOutlined, TwitterOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { loadPostsLoading } = useSelector((state) => state.posts);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = useCallback((e) => {
    setSearchInput(e.target.value.trim());
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = useCallback(() => {
    if (!searchInput) return;
    if (searchInput) {
      Router.push(`/hashtag/${searchInput}`);
    }
  }, [searchInput]);

  const searchStyle = useMemo(() => ({ verticalAlign: 'middle', width: '25vw' }), []);

  return (
    <div>
      <div style={{ zIndex: 10, position: 'absolute', right: 0, top: 16 }}>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>
      </div>
      <div className="menu__mobile-search">
        <Menu mode="horizontal">
          <Input.Search
            maxLength={20}
            minLength={1}
            style={{ width: '80vw' }}
            prefix="#"
            placeholder="해시태그"
            enterButton
            value={searchInput}
            onChange={handleSearchInput}
            onSearch={handleSearch}
            loading={loadPostsLoading}
            disabled={loadPostsLoading}
          />
        </Menu>
      </div>
      <div className="menu__normal-wrapper">
        <Menu mode="horizontal">
          <Menu.Item key="homeMenu" icon={<TwitterOutlined />}>
            <Link href="/"><a>트위터</a></Link>
          </Menu.Item>
          <Menu.Item key="profileMenu" icon={<MailOutlined />}>
            <Link href="/profile"><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Input.Search
              maxLength={20}
              minLength={1}
              style={searchStyle}
              prefix="#"
              placeholder="해시태그"
              enterButton
              value={searchInput}
              onChange={handleSearchInput}
              onSearch={handleSearch}
              loading={loadPostsLoading}
              disabled={loadPostsLoading}
            />
          </Menu.Item>
          <Menu.Item key="signupMenu" icon={<AppstoreOutlined />} style={{ float: 'right' }} hidden={currentUser.id}>
            <Link href="/signup"><a>회원가입</a></Link>
          </Menu.Item>
        </Menu>
      </div>
      <Drawer
        width="300px"
        placement="left"
        visible={visible}
        closable={false}
        onClose={onClose}
      >
        <Menu mode="inline">
          <Menu.Item key="homeMenu" icon={<TwitterOutlined />}>
            <Link href="/"><a>트위터</a></Link>
          </Menu.Item>
          <Menu.Item key="profileMenu" icon={<MailOutlined />}>
            <Link href="/profile"><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item key="signupMenu" icon={<AppstoreOutlined />} style={{ float: 'right' }} hidden={currentUser.id}>
            <Link href="/signup"><a>회원가입</a></Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
}

export default NavBar;
