import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'

import { iconfontUrl } from '@src/config'

const Icon = createFromIconfontCN({
  scriptUrl: iconfontUrl, // 在 iconfont.cn 上生成
})

export default Icon

type IconType = {
  name: string
  size?: number
}
export const MenuIcon = ({ name, size }: IconType) => (
  <Icon type={`icon-${name}`} style={{ fontSize: size || 20 }} />
)
