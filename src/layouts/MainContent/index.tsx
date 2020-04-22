import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { useLocation } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, Redirect } from 'react-router-dom'
// import ErrorBoundary from '@components/ErrorBoundary';
import PageLoading from '@components/PageLoading'
import Exception from '@components/Exception'
import { generateRoutes } from '@utils/routeUtils'

import styles from './styles.scss'

const { Content } = Layout

const MainContent: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition key={pathname} timeout={500}>
        <div className={styles.content}>
          {/* <ErrorBoundary> */}
          <Suspense fallback={<PageLoading />}>
            <Switch>
              {generateRoutes()}
              <Route path="/error" component={Exception} />;
              <Redirect to="/error" />;
            </Switch>
          </Suspense>
          {/* </ErrorBoundary> */}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default MainContent
