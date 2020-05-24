import React from 'react'
import { Form, DatePicker } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import SearchButton from '@components/Button/SearchButton'
import moment from 'moment'
// 公共
import BaseTable from '@components/BaseTable'
import { useRequest } from '@umijs/hooks'
import useTable from '@hooks/useTable'

import { generateFormItem, FormFieldConfig } from '@utils/formUtils'
// 本地
import { LogListItem, LogSearchForm } from '../user.type'
import { getOperateLogListApi, getOperateTypeApi } from '../api'

const { RangePicker } = DatePicker

const Log: React.FC = () => {
  // Form + Modal + Table hooks:
  const [filterForm] = Form.useForm()
  const { tableProps, search } = useTable(
    getOperateLogListApi,
    filterForm,
    ({ operate_time_range, ...rest }: LogSearchForm) => {
      // 格式化rangepicker
      let formatRange = ''
      if (operate_time_range && operate_time_range.length === 2) {
        const startTimeStamp = operate_time_range[0].startOf('date').valueOf()
        const endTimeStamp = operate_time_range[1].endOf('date').valueOf()
        formatRange = `${startTimeStamp},${endTimeStamp}`
      }
      return {
        ...rest,
        operate_time_range: formatRange,
      }
    },
  )
  const { submit } = search
  // Api
  const { data: typeOptions = [] } = useRequest(getOperateTypeApi, {
    formatResult: (res) =>
      res.list.map((item) => ({
        key: item.operate_type.toString(),
        content: item.content,
      })),
  })

  const columns: Array<ColumnProps<LogListItem>> = [
    {
      title: '用户名',
      dataIndex: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'chinese_name',
    },
    {
      title: '操作对象',
      dataIndex: 'operate_object',
    },
    {
      title: '操作类型',
      dataIndex: 'operate_type',
    },
    {
      title: '操作时间',
      dataIndex: 'operate_time',
      render: (val) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]
  const filterFields: Array<FormFieldConfig<LogSearchForm>> = [
    {
      component: 'input',
      name: 'user_id',
      label: '用户名',
      props: { placeholder: '用户名', allowClear: true },
    },
    {
      component: 'custom',
      name: 'operate_time_range',
      label: '操作时间',
      render: (
        <RangePicker
          allowClear
          disabledDate={(date) => {
            return date < moment().subtract(180, 'days') || date > moment().endOf('date')
          }}
        />
      ),
    },
    {
      component: 'select',
      name: 'operate_type',
      label: '操作类型',
      options: typeOptions,
      hasAll: true,
      props: { allowClear: true, style: { width: 170 } },
    },
  ]

  return (
    <>
      <Form
        className="filter-form"
        form={filterForm}
        layout="inline"
        colon={false}
        initialValues={{
          operate_type: '',
          operate_time_range: [moment().subtract(180, 'days'), moment().endOf('date')],
        }}
      >
        {generateFormItem(filterFields)}
        <SearchButton onSubmit={submit} />
      </Form>
      <BaseTable<LogListItem> {...tableProps} columns={columns} rowKey="id" />
    </>
  )
}

export default Log
