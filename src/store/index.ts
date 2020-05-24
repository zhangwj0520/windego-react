/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { combineReducers, Reducer, ReducersMapObject } from 'redux'

import userInfoReducer from './modules/user.module'
import basicReducer from './modules/basic.module'

type AsyncReducers = {
  [propName: string]: Reducer
}
// 异步reducer
const asyncReducers: AsyncReducers = {}

function makeRootReducer<A, M extends ReducersMapObject<A>>(reducers?: M) {
  return combineReducers({
    user: userInfoReducer,
    basic: basicReducer,
    ...reducers,
  })
}

const middleware = getDefaultMiddleware()
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = configureStore({
  reducer: makeRootReducer(),
  middleware,
})

export const injectReducer = (name: string, reducer: Reducer) => {
  if (!asyncReducers.name) {
    asyncReducers[name] = reducer
  }

  // 可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
  store.replaceReducer(makeRootReducer(asyncReducers)) // 注入时更新
}

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
