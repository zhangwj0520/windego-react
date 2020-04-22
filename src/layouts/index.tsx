import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import BasicLayout, {
  SettingDrawer,
  DefaultFooter,
  PageHeaderWrapper,
} from '@ant-design/pro-layout'
import { getDocumentTitle } from '@utils/routeUtils'
import { Link } from 'react-router-dom'
import WaterMark from '@components/WaterMark'
import logo from '@assets/images/logo.png'
// import LogRocket from 'logrocket'
import { MenuIcon } from '@components/Icon'
import { GithubOutlined } from '@ant-design/icons'
import MainContent from './MainContent'
import RightContent from './Header/RightContent'

// LogRocket.init('mo2kks/react-app')

const menuData = () => [
  {
    path: '/',
    name: 'React',
    icon: <MenuIcon name="react" />,
  },
  {
    path: '/business',
    name: '首页',
    icon: <MenuIcon name="home" />,
    children: [
      {
        path: '/business/manage',
        name: 'analysis',
      },
      {
        path: '/business/counter',
        name: 'monitor',
      },
    ],
  },
]

const defaultFooterDom = (
  <DefaultFooter
    copyright="2019 蚂蚁金服体验技术部出品"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
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
function Index() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `React-${getDocumentTitle(pathname)}`
  }, [pathname])

  return (
    <>
      <BasicLayout
        style={{ height: '100vh', width: '100vw' }}
        title="标题标题"
        logo={logo}
        // navTheme="light"
        contentStyle={{ margin: 12 }}
        // fixedHeader // 是否固定头部
        siderWidth={180} // 菜单宽度
        // breadcrumbRender={(routers = []) => {
        //   return [
        //     {
        //       path: '/',
        //       breadcrumbName: '首页',
        //     },
        //     ...routers,
        //   ]
        // }}
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0
        //   return first ? (
        //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   )
        // }}
        menuDataRender={menuData}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>
        }}
        footerRender={() => defaultFooterDom}
        rightContentRender={() => <RightContent />}
      >
        <MainContent />
      </BasicLayout>

      <SettingDrawer />
    </>
  )
}

export default Index
