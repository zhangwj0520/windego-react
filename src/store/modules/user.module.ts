import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd'
// eslint-disable-next-line import/no-cycle
import store, { AppThunk, RootState } from '@store/index'
import { get } from '@utils/request'
// eslint-disable-next-line import/no-cycle
import { onLogin } from './basic.module'
import { PhoneType, LoginParams, CodeType } from './module.type'

const userInfo: IUserInfo = {
  user_id: '',
  userName: '用户名',
  name: '用户名',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  role_id: 0,
  role_name: '',
  status: 0,
  is_super: 0,
  auth_list: [],
  privilege_list: [],
  report_privilege: 4,
}

export const slice = createSlice({
  name: 'user',
  initialState: { userInfo, code: '' },
  reducers: {
    setCode: (state, { payload }: PayloadAction<CodeType>) => {
      state.code = payload.code
    },
    setUserInfo: (state, { payload }: PayloadAction<IUserInfo>) => {
      state.userInfo = payload
      // Object.entries(payload).forEach((item) => {
      //   const [key, val] = item
      //   state[key] = val
      // })
    },
  },
})

export const { setUserInfo, setCode } = slice.actions
export const selectUserInfo = (state: RootState) => state.user.userInfo

// service

export const getCodeApi = (params: PhoneType) => get<CodeType>('/common/getcode', params)

export const getCode = (params: PhoneType): AppThunk => async (dispatch) => {
  const data = await getCodeApi(params)
  dispatch(setCode(data))
  message.success('模拟获取验证码,打开开发者工具查看!')
}
export const login = (params: LoginParams): AppThunk => (dispatch) => {
  const { code } = store.getState().user
  console.log(code)
  if (params.code === code) {
    dispatch(onLogin())
    message.success('模拟登陆成功!')
  } else {
    message.error('验证码错误')
  }
}

/**
 * 获取用户信息
 */

export default slice.reducer
