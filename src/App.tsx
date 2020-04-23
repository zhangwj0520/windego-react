import React, { useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from '@layouts/index'
import { getUserInfo } from '@layouts/api'
import { setUserInfo } from '@src/store/modules/userInfo.module'
import { useStore, useDispatch } from '@hooks/useStore'

import Login from '@pages/login'
import LogRocket from 'logrocket'
// import setupLogRocketReact from 'logrocket-react'

// after calling LogRocket.init()
// setupLogRocketReact(LogRocket)

LogRocket.init('mo2kks/cra-app')

// LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
//   name: 'James Morrison',
//   email: 'jamesmorrison@example.com',

//   // Add your own custom user variables here, ie:
//   subscriptionType: 'pro',
// })
const Root = () => {
  const dispatch = useDispatch()
  const { isLogin } = useStore('basic')

  useEffect(() => {
    const getInitData = async () => {
      const data = await getUserInfo()
      dispatch(setUserInfo(data))
    }
    getInitData()
  })

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
