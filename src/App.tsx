import React, { useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from '@layouts/index'
import { getUserInfo } from '@layouts/api'
import { setUserInfo } from '@src/store/modules/userInfo.module'
import { useStore, useDispatch } from '@hooks/useStore'

import Login from '@pages/login'

console.log(11)
const Root = () => {
  const dispatch = useDispatch()
  const { isLogin } = useStore('basic')

  useEffect(() => {
    const getInitData = async () => {
      const data = await getUserInfo()
      dispatch(setUserInfo(data))
    }
    getInitData()
  }, [dispatch])

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
