import React, { useState } from 'react'
import { Drawer, Divider, Switch, List, Tooltip } from 'antd'
import { CloseOutlined, SettingOutlined } from '@ant-design/icons'
import { onChangeFixedHeader, onChangeFixSiderbar } from '@store/modules/basic.module'
import { useStore, useDispatch } from '@hooks/useStore'
import NavTheme from './NavTheme'
import ThemeColor from './ThemeColor'

interface BodyProps {
  title: string
}

interface SettingItemProps {
  title: React.ReactNode
  action: React.ReactElement
  disabled?: boolean
  disabledReason?: React.ReactNode
}

const Body: React.FC<BodyProps> = ({ children, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
)
export const renderLayoutSettingItem = (item: SettingItemProps) => {
  const action = React.cloneElement(item.action, {
    disabled: item.disabled,
  })
  return (
    <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
      <List.Item actions={[action]}>
        <span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
      </List.Item>
    </Tooltip>
  )
}

const SettingDrawer = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const { fixedHeader, fixSiderbar } = useStore('basic')
  return (
    <Drawer
      visible={show}
      width={300}
      onClose={() => setShow(false)}
      placement="right"
      handler={
        <div className="ant-pro-setting-drawer-handle" onClick={() => setShow(!show)}>
          {show ? (
            <CloseOutlined
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          ) : (
            <SettingOutlined
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          )}
        </div>
      }
    >
      <div className="ant-pro-setting-drawer-content">
        <Body title="导航模式">
          <NavTheme />
        </Body>
        <Divider />
        <Body title="菜单栏主题">
          <ThemeColor />
        </Body>
        <Divider />
        <Body title="菜单栏主题">
          <List
            split={false}
            renderItem={renderLayoutSettingItem}
            dataSource={[
              {
                title: '固定 Header',
                action: (
                  <Switch
                    size="small"
                    checked={!!fixedHeader}
                    onChange={(checked) => dispatch(onChangeFixedHeader(checked))}
                  />
                ),
              },
              {
                title: '固定侧边菜单',
                action: (
                  <Switch
                    size="small"
                    checked={!!fixSiderbar}
                    onChange={(checked) => dispatch(onChangeFixSiderbar(checked))}
                  />
                ),
              },
            ]}
          />
        </Body>
      </div>
    </Drawer>
  )
}

export default SettingDrawer
