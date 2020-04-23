import React, { Suspense } from 'react'
import { useLocation } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, Redirect } from 'react-router-dom'
// import ErrorBoundary from '@components/ErrorBoundary';
import PageLoading from '@components/PageLoading'
import Exception from '@components/Exception'
import { generateRoutes } from '@utils/routeUtils'

import styles from './styles.scss'

const MainContent: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition classNames="fade" key={pathname} timeout={500}>
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
