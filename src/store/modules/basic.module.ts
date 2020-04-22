import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '@store/index'
import { useHistory } from 'react-router'

import cacheStorage from '@utils/localstorageExpires'

interface BasicState {
  collapsed: boolean
  title: string
  isLogin: boolean
}
const initialState: BasicState = {
  collapsed: cacheStorage.get('collapsed'),
  title: 'React Demo',
  isLogin: cacheStorage.get('isLogin'),
}

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    // setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
    //   const { type, payload } = action;
    //   Object.entries(payload).forEach(item => {
    //     const [key, val] = item;
    //     state[key] = val;
    //   });
    // },
    changeCollapsed: (state) => {
      const collapsed = !state.collapsed
      cacheStorage.set('collapsed', collapsed)
      state.collapsed = collapsed
    },
    login: (state) => {
      cacheStorage.set('isLogin', true)
      state.isLogin = true
    },
    logout: (state) => {
      cacheStorage.clear()
      state.isLogin = false
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
})

export const { changeCollapsed, login, logout } = slice.actions
export const { name } = slice
export const selectCollapsed = (state: RootState) => state.basic.collapsed
export const getTitle = (state: RootState) => state.basic.title

export default slice.reducer
