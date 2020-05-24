/**
 * ! api命名请以Api结尾，准确定义输入输出类型, 并添加中文注释
 * ! 若是list接口 命名中也请带list
 */

import { get, post } from '@utils/request'
import * as types from './user.type'

/**
 * 获取账号列表
 */
export const getAccountListApi = (params: types.GetAccountListParams) =>
  get<IListResponse<types.AccountListItem>>('/account/accountlist', params)

/**
 * 获取角色下拉选项
 */
export const getRoleOptionApi = () =>
  get<IListResponse<types.RoleOptionItem>>('/config/rolenamelist', { type: 1 })
/**
 * 获取角色下拉选项
 */
export const getRoleModifyOptionApi = () =>
  get<IListResponse<types.RoleOptionItem>>('/config/rolenamelist', { type: 1 })

/**
 * 报表维度权限
 */
export const getReportPrivilegeApi = () =>
  get<IListResponse<types.ReportPrivilegeItem>>('/config/allreportprivilege')

/**
 * 获取全量市场列表
 */
export const getAllMarketListApi = () =>
  get<{ market_list: types.AllMarketListItem[] }>('/config/marketlist')

/**
 * 新建账号
 */
export const addAccountApi = (params: types.AddAccountParams) =>
  post<boolean>('/account/addaccount', params)

/**
 * 修改账号
 */
export const modifyAccountApi = (params: types.AddAccountParams) =>
  post<boolean>('/account/modifyaccount', params)

/**
 * 校验账号
 */
export const checkUserIdApi = (params: types.CheckUserId) =>
  get<IListResponse<boolean>>('/account/checkuserid', params)

/**
 * 获取角色列表
 */
export const getRoleListApi = (params: types.RoleListParams) =>
  get<IListResponse<types.RoleListItem>>('/account/rolelist', params)

/**
 * 全量功能权限列表
 */
export const getPrivilegeListApi = () =>
  get<IListResponse<types.PrivilegeItem>>('/config/privilegelist')

/**
 * 新建自定义角色
 */
export const addRoleApi = (params: types.AddRoleParams) => post<boolean>('/account/addrole', params)
/**
 * 新建已有角色
 */
export const initRoleApi = (params: types.InitRoleParams) =>
  post<boolean>('/account/initrole', params)

/**
 * 修改角色
 */
export const modifyRoleApi = (params: types.ModifyRoleParams) =>
  post<boolean>('/account/modifyrole', params)

/**
 * 操作日志列表
 */
export const getOperateLogListApi = (params: types.LogListParams) =>
  get<IListResponse<types.LogListItem>>('/account/operatelog', params)

/**
 * 日志操作类型下拉
 */
export const getOperateTypeApi = () =>
  get<{ list: types.OperateTypeItem[] }>('/config/operatetypelist')
