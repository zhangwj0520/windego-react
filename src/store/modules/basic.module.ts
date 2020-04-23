import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { RootState } from '@store/index'

import cacheStorage from '@utils/localstorageExpires'

export type SiderTheme = 'light' | 'dark'
export type LayoutType = 'sidemenu' | 'topmenu'
interface BasicState {
  theme?: SiderTheme
  collapsed: boolean
  title: string
  isLogin: boolean
  layout: LayoutType
  fixedHeader: boolean
  fixSiderbar: boolean
}
const initialState: BasicState = {
  theme: cacheStorage.get('theme') || 'dark',
  collapsed: cacheStorage.get('collapsed'),
  title: 'React Demo',
  isLogin: cacheStorage.get('isLogin'),
  layout: cacheStorage.get('layout') || 'sidemenu',
  fixedHeader: cacheStorage.get('fixedHeader') || false,
  fixSiderbar: cacheStorage.get('fixSiderbar') || true,
}

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    onChangeTheme: (state, { payload }: PayloadAction<SiderTheme>) => {
      cacheStorage.set('theme', payload)
      state.theme = payload
    },
    onChangeLayout: (state, { payload }: PayloadAction<LayoutType>) => {
      cacheStorage.set('layout', payload)
      state.layout = payload
    },
    onChangeFixedHeader: (state, { payload }: PayloadAction<boolean>) => {
      cacheStorage.set('fixedHeader', payload)
      state.fixedHeader = payload
    },
    onChangeFixSiderbar: (state, { payload }: PayloadAction<boolean>) => {
      cacheStorage.set('fixSiderbar', payload)
      state.fixSiderbar = payload
    },
    onCollapse: (state, { payload }: any) => {
      cacheStorage.set('collapsed', payload)
      state.collapsed = payload
    },
    login: (state) => {
      cacheStorage.set('isLogin', true)
      state.isLogin = true
    },
    logout: (state) => {
      cacheStorage.clear()
      state.isLogin = false
    },
  },
})

export const {
  onCollapse,
  login,
  logout,
  onChangeTheme,
  onChangeLayout,
  onChangeFixedHeader,
  onChangeFixSiderbar,
} = slice.actions
export const { name } = slice
export const selectCollapsed = (state: RootState) => state.basic.collapsed
export const getTitle = (state: RootState) => state.basic.title
export const getTheme = (state: RootState) => state.basic.theme
export const getLayout = (state: RootState) => state.basic.layout

export default slice.reducer
