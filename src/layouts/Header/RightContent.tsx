import { Tooltip, Tag } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'
import Avatar from './AvatarDropdown'
// import HeaderSearch from '../HeaderSearch'
// import SelectLang from '../SelectLang'
import styles from './RightContent.less'

export type SiderTheme = 'light' | 'dark'

type Props = {
  theme?: SiderTheme
  layout: 'sidemenu' | 'topmenu'
}

const GlobalHeaderRight: React.SFC = () => {
  const theme = 'light'
  const layout = 'sidemenu'
  const className = styles.right

  // if (theme === 'dark' && layout === 'topmenu') {
  //   className = `${styles.right}  ${styles.dark}`
  // }

  return (
    <div className={className}>
      <Avatar />
    </div>
  )
}

export default GlobalHeaderRight
