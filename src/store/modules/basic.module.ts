import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '@store/index'
import { get, post } from '@utils/request'
import storage from '@utils/localStorage'
import { PhoneType, LoginParams } from './module.type'

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

    logout: (state) => {
      storage.clear()
      state.isLogin = false
    },
  },
})

export const {
  onCollapse,
  logout,
  onChangeTheme,
  onChangeLayout,
  onChangeFixedHeader,
  onChangeFixSiderbar,
} = slice.actions
export const { name } = slice

export const getCodeApi = (params: PhoneType) => get<IResponseData<boolean>>('/crm/getcode', params)
export const loginApi = (params: LoginParams) => post<IResponseData<boolean>>('/crm/login', params)
export const login = (params: LoginParams): AppThunk => () => {
  const userInfo = loginApi(params)
  console.log(userInfo)
}

export const selectCollapsed = (state: RootState) => state.basic.collapsed
export const getTitle = (state: RootState) => state.basic.title
export const getTheme = (state: RootState) => state.basic.theme
export const getLayout = (state: RootState) => state.basic.layout

export default slice.reducer
