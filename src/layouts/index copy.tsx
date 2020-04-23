import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Layout, BackTop } from 'antd'
import { getDocumentTitle } from '@utils/routeUtils'
import WaterMark from '@components/WaterMark'

import Header from './Header'
import SideMenu from './SideMenu'
import MainContent from './MainContent'

function Index() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `React-${getDocumentTitle(pathname)}`
  }, [pathname])

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <SideMenu />
      <WaterMark />
      <Layout style={{ height: '100vh' }}>
        <Header />
        <MainContent />
        <BackTop />
      </Layout>
    </Layout>
  )
}

export default Index
