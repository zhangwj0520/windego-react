import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
// import { RootState } from '@store/index'
import storage from '@utils/localStorage'

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
  theme: storage.get('theme') || 'dark',
  collapsed: storage.get('collapsed'),
  title: 'React Demo',
  isLogin: storage.get('isLogin'),
  layout: storage.get('layout') || 'sidemenu',
  fixedHeader: storage.get('fixedHeader') || false,
  fixSiderbar: storage.get('fixSiderbar') || true,
}

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    onChangeTheme: (state, { payload }: PayloadAction<SiderTheme>) => {
      storage.set('theme', payload)
      state.theme = payload
    },
    onChangeLayout: (state, { payload }: PayloadAction<LayoutType>) => {
      storage.set('layout', payload)
      state.layout = payload
    },
    onChangeFixedHeader: (state, { payload }: PayloadAction<boolean>) => {
      storage.set('fixedHeader', payload)
      state.fixedHeader = payload
    },
    onChangeFixSiderbar: (state, { payload }: PayloadAction<boolean>) => {
      storage.set('fixSiderbar', payload)
      state.fixSiderbar = payload
    },
    onCollapse: (state, { payload }: any) => {
      storage.set('collapsed', payload)
      state.collapsed = payload
    },
    onLogin: (state) => {
      storage.set('isLogin', true)
      state.isLogin = true
    },
    logout: (state) => {
      storage.clear()
      state.isLogin = false
    },
  },
})

export const {
  actions: {
    onCollapse,
    logout,
    onLogin,
    onChangeTheme,
    onChangeLayout,
    onChangeFixedHeader,
    onChangeFixSiderbar,
  },
} = slice

export default slice.reducer
