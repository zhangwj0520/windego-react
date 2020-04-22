import React from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import { ClickParam } from 'antd/es/menu'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import HeaderDropdown from '@components/HeaderDropdown'
import { logout } from '@store/modules/basic.module'

import styles from './avatar.less'

const AvatarDropdown = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentUser = {
    name: 'Name',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  }
  const onMenuClick = (event: ClickParam) => {
    const { key } = event

    if (key === 'logout') {
      dispatch(logout())
      history.push('/login')
    }

    // history.push(`/account/${key}`)
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>

      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return currentUser && currentUser.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={styles.name}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )
}

export default AvatarDropdown
