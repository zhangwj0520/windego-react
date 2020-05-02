import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import BasicLayout from '@ant-design/pro-layout'
import { getDocumentTitle } from '@utils/routeUtils'
import { Link } from 'react-router-dom'
import WaterMark from '@components/WaterMark'
import logo from '@assets/images/logo.png'
import { useStore, useDispatch } from '@hooks/useStore'
import { onCollapse } from '@store/modules/basic.module'
import { getUserInfo } from '@layouts/api'
import { setUserInfo } from '@src/store/modules/user.module'
import { iconfontUrl } from '@src/config'

import menuData from '@routes/route.config'
import SettingDrawer from './SettingDrawer'

import MainContent from './MainContent'
import Footer from './Footer'
import RightContent from './Header/RightContent'

function Index() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { collapsed, theme, layout, fixedHeader, fixSiderbar } = useStore('basic')

  useEffect(() => {
    document.title = `React-${getDocumentTitle(pathname)}`
  }, [pathname])

  useEffect(() => {
    const getInitData = async () => {
      const data = await getUserInfo()
      dispatch(setUserInfo(data))
    }
    getInitData()
  }, [dispatch])

  return (
    <>
      <BasicLayout
        style={{ height: '100vh', width: '100vw' }}
        title="标题标题"
        layout={layout}
        logo={logo}
        collapsed={collapsed}
        onCollapse={(val) => dispatch(onCollapse(val))}
        iconfontUrl={iconfontUrl}
        navTheme={theme}
        contentStyle={{ margin: 5 }}
        fixSiderbar={fixSiderbar}
        fixedHeader={fixedHeader} // 是否固定头部
        siderWidth={180} // 菜单宽度
        menuDataRender={() => menuData}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>
        }}
        footerRender={() => <Footer />}
        rightContentRender={() => <RightContent />}
      >
        <MainContent />
        <WaterMark />
      </BasicLayout>
      <SettingDrawer />
    </>
  )
}

export default Index
