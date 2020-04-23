import React from 'react'

import { Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useStore } from '@hooks/useStore'
import { SiderTheme, onChangeTheme } from '@store/modules/basic.module'
import { useDispatch } from 'react-redux'

type List = {
  title: string
  key: SiderTheme
  url: string
}

const baseClassName = 'ant-pro-setting-drawer-block-checbox'

const BlockCheckbox = () => {
  const dispatch = useDispatch()
  const { theme } = useStore('basic')
  const list: List[] = [
    {
      key: 'light',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
      title: '亮色菜单风格',
    },
    {
      key: 'dark',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
      title: '暗色菜单风格',
    },
  ]

  return (
    <div className={baseClassName} key={theme}>
      {list.map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <div
            className={`${baseClassName}-item`}
            onClick={() => dispatch(onChangeTheme(item.key))}
          >
            <img src={item.url} alt={item.key} />
            <div
              className={`${baseClassName}-selectIcon`}
              style={{
                display: theme === item.key ? 'block' : 'none',
              }}
            >
              <CheckOutlined />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

export default BlockCheckbox
