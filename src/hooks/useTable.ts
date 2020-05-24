import { useFormTable } from '@umijs/hooks'
import {
  PaginatedParams,
  Result,
  BaseOptions,
  UseAntdTableFormUtils,
} from '@umijs/hooks/es/useFormTable'
import { baseTablePagniation } from '@constants/base'

const useTable = <Params extends object, Item = any, U extends Item = any>(
  service: (params: Params & IPagerParams) => Promise<IListResponse<Item>>,
  form: UseAntdTableFormUtils,
  beforeSearch?: <SearchForm>(formData: SearchForm) => Params,
  options?: BaseOptions<U>,
): Result<Item> =>
  useFormTable(
    ({ current, pageSize }: PaginatedParams[0], formData: any) => {
      const params = beforeSearch ? beforeSearch(formData) : formData
      console.log(params)
      return service({
        ...params,
        page: current,
        page_size: pageSize,
      })
    },
    {
      defaultPageSize: baseTablePagniation.pageSize,
      form,
      ...options,
    },
  )

export default useTable
