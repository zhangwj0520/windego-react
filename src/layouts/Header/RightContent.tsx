import React from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import { ClickParam } from 'antd/es/menu'
import { useHistory } from 'react-router'
import { useStore, useDispatch } from '@hooks/useStore'
import HeaderDropdown from '@components/HeaderDropdown'
import { logout } from '@store/modules/basic.module'
// import HeaderSearch from '../HeaderSearch'
// import SelectLang from '../SelectLang'
import styles from './RightContent.less'

const GlobalHeaderRight: React.SFC = () => {
  const {
    basic: { theme, layout },
    user: { name, avatar },
  } = useStore(['basic', 'user'])
  let className = styles.right

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`
  }

  const history = useHistory()
  const dispatch = useDispatch()

  const onMenuClick = (event: ClickParam) => {
    const { key } = event

    if (key === 'logout') {
      dispatch(logout())
      history.push('/login')
    }
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

  return (
    <div className={className}>
      {name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
            <span className={styles.name}>{name}</span>
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
      )}
    </div>
  )
}

export default GlobalHeaderRight
