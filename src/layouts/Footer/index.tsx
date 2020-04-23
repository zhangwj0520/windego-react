import React from 'react'
import { DefaultFooter } from '@ant-design/pro-layout'
import { GithubOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <DefaultFooter
      copyright="2020 张为杰出品"
      links={[
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
