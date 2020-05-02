import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { RootState } from '@store/index'

const initialState: IUserInfo = {
  user_id: '',
  userName: '用户名',
  name: '',
  avatar: '',
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
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<IUserInfo>) => {
      Object.entries(payload).forEach((item) => {
        const [key, val] = item
        state[key] = val
      })
    },
  },
})

export const { setUserInfo } = slice.actions
export const selectUserInfo = (state: RootState) => state.user

// service

/**
 * 获取用户信息
 */

export default slice.reducer
