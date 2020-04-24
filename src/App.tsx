import React from 'react'
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from '@layouts/index'
import { useStore } from '@hooks/useStore'

import Login from '@pages/login'

const Root = () => {
  const { isLogin } = useStore('basic')

  return (
    <Router>
      <Switch>
        <Route component={Login} exact path="/login" />
        <Route render={() => (isLogin ? <App /> : <Redirect to="/login" />)} />
      </Switch>
    </Router>
  )
}

export default Root
