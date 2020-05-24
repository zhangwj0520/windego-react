import { Moment } from 'moment'

// Account
export interface AccountSearchForm {
  user_id?: string
  chinese_name?: string
  role_id?: number
  status?: string
}

export type GetAccountListParams = AccountSearchForm & IPagerParams
export type AccountListItem = Omit<IUserInfo, 'privilege_list' | 'user_name'>

export interface AllMarketListItem {
  market_code: string
  market_name: string
}

export interface AddAccountParams {
  user_id: string
  chinese_name: string
  role_id: number
  status: number
  auth_list: number[]
}

export interface RoleOptionItem {
  role_id: number
  role_name: string
  is_inited: 0 | 1 // 1:已被初始化赋予权限，列表中置灰
}

// Role
export interface RoleSearchForm {
  role_id?: number
}
export type RoleListParams = RoleSearchForm & IPagerParams

export interface RoleListItem {
  role_id: number
  role_name: string
  report_privilege: number
  privilege_list: IPrivilege[]
  create_time: number
  update_time: number
}
export interface PrivilegeItem {
  privilege_id: number
  name: string
  content: string
}

export interface AddRoleParams {
  role_name: string
  privilege_list: number[]
  report_privilege: string
}
export interface InitRoleParams {
  role_id: number
  privilege_list: number[]
  report_privilege: string
}

export interface ModifyRoleParams {
  role_id: number
  privilege_list: number[]
  report_privilege: string
}

export interface LogListItem {
  id: number
  user_id: string
  chinese_name: string
  operate_object: string
  operate_type: number
  operate_time: number
}

export interface LogSearchForm {
  user_id?: string
  operate_time_range?: Moment[]
  operate_type?: number
}

export interface OperateTypeItem {
  operate_type: number
  content: string
}

export interface LogListParams extends IPagerParams {
  operate_time_range?: string // 发送给后端格式为 '时间戳,时间戳'
  user_id?: string
  operate_type?: number
}

export interface CheckUserId {
  user_id: string
}

export interface ReportPrivilegeItem {
  code: number
  desc: string
}

export interface GetRoleOptionApiParams {
  type?: number
}
