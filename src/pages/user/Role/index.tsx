import React, { useState } from 'react'
import { Button, Form, Modal, message, Radio, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import SearchButton from '@components/Button/SearchButton'
import moment from 'moment'
// 公共
import BaseTable from '@components/BaseTable'
import useTable from '@hooks/useTable'
import { useRequest } from '@umijs/hooks'
import useModel from '@hooks/useModel'
import { generateFormItem, FormFieldConfig } from '@utils/formUtils'
// 本地

import {
  RoleListItem,
  RoleSearchForm,
  AddRoleParams,
  ModifyRoleParams,
  InitRoleParams,
} from '../user.type'
import {
  getRoleListApi,
  getRoleModifyOptionApi,
  addRoleApi,
  initRoleApi,
  modifyRoleApi,
  getPrivilegeListApi,
  getReportPrivilegeApi,
} from '../api'

const { Option } = Select

const UserRole: React.FC = () => {
  // Form + Modal + Table hooks:
  const [filterForm] = Form.useForm()
  const [modalForm] = Form.useForm()
  const { tableProps, search } = useTable(getRoleListApi, filterForm)
  const { visible, open, close, modalType, modalTypeText } = useModel()
  const [isNewRole, setIsNewRole] = useState(false)
  const { submit } = search
  // Api
  const { data: roleOptions = [] } = useRequest(getRoleModifyOptionApi, {
    formatResult: (res) =>
      res.list.map((item) => ({
        ...item,
        key: item.role_id.toString(),
        value: item.role_id,
        content: item.role_name,
      })),
  })
  const { data: privilegeData = [] } = useRequest(getPrivilegeListApi, {
    formatResult: (res) =>
      res.list.map((item) => ({
        key: item.privilege_id.toString(),
        title: item.name,
      })),
  })
  const { data: reportPrivilegeData = [] } = useRequest(getReportPrivilegeApi, {
    formatResult: (res) =>
      res.list.map((item) => ({
        key: item.code.toString(),
        value: item.code,
        content: item.desc,
      })),
  })

  const handleClickModify = async (row: RoleListItem) => {
    modalForm.setFieldsValue({
      ...row,
      privilege_list: row.privilege_list.map((item) => item.id.toString()),
    })
    open('modify')
  }
  const handleClickCreate = () => {
    modalForm.resetFields()
    // setIsNewRole(true);
    open('create')
  }

  const handleSubmit = async () => {
    try {
      const values = await modalForm.validateFields()
      const formatList = values.privilege_list.map((id: string) => Number(id))
      if (modalType === 'create') {
        // 新建已有角色传id+list， 新建自定义角色传name+list
        if (isNewRole) {
          await addRoleApi({
            role_name: values.role_name,
            privilege_list: formatList,
            report_privilege: values.report_privilege,
          })
        } else {
          await initRoleApi({
            role_id: values.role_id,
            privilege_list: formatList,
            report_privilege: values.report_privilege,
          })
        }
      } else {
        await modifyRoleApi({
          role_id: values.role_id,
          privilege_list: formatList,
          report_privilege: values.report_privilege,
        })
      }
      close()
      message.success(`${modalTypeText}角色成功`)
      submit()
    } catch (error) {
      console.log(error)
    }
  }

  const columns: Array<ColumnProps<RoleListItem>> = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      align: 'center',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'create_time',
      render: (val) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'update_time',
      render: (val) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      align: 'center',
      render: (_, row) => (
        <a className="table-button" onClick={() => handleClickModify(row)}>
          修改
        </a>
      ),
    },
  ]
  const filterFields: Array<FormFieldConfig<RoleSearchForm>> = [
    {
      component: 'select',
      name: 'role_id',
      label: '角色名称',
      options: roleOptions,
      hasAll: true,
      props: { allowClear: true, showSearch: true, placeholder: '请选择角色名称' },
    },
  ]

  // 外部状态控制表单联动
  const modalFields: Array<FormFieldConfig<AddRoleParams & InitRoleParams & ModifyRoleParams>> = [
    {
      show: modalType === 'create',
      component: 'custom',
      label: '角色类型',
      rules: [],
      render: (
        <Radio.Group
          defaultValue={2}
          buttonStyle="solid"
          onChange={(e) => setIsNewRole(e.target.value === 1)}
        >
          <Radio.Button value={2}>选择角色</Radio.Button>
          <Radio.Button value={1}>自定义角色</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      show: !isNewRole && modalType === 'create', // 创建时会有
      component: 'select',
      name: 'role_id',
      label: '选择角色',
      rules: [{ required: true, message: '请选择角色' }],
      options: roleOptions.map((item) => ({ ...item, disabled: item.is_inited === 1 })),
      props: {
        placeholder: '请选择角色',
      },
    },
    {
      show: isNewRole || modalType === 'modify', // 修改时两种type共用这个name
      component: 'input',
      name: 'role_name',
      label: '角色名称',
      rules: [{ required: true, message: '请输入角色' }],
      props: {
        disabled: modalType === 'modify',
        placeholder: '请输入角色名称',
      },
    },
    {
      component: 'transfer',
      name: 'privilege_list',
      label: '添加功能权限',
      rules: [{ required: true, message: '请选择功能权限' }],
      options: privilegeData,
      props: {
        style: { width: 500 },
      },
    },
    {
      component: 'custom',
      name: 'report_privilege',
      label: '统计报表维度',
      rules: [{ required: true, message: '请选择统计报表维度' }],
      render: (
        <>
          <Form.Item name="report_privilege">
            <Select placeholder="请选择统计报表维度">
              {reportPrivilegeData.map((item) => (
                <Option key={item.key} value={item.value || item.key}>
                  {item.content}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
  ]

  return (
    <>
      <Form className="filter-form" form={filterForm} layout="inline" colon={false}>
        {generateFormItem(filterFields)}
        <SearchButton onSubmit={submit} />
      </Form>
      <BaseTable<RoleListItem>
        {...tableProps}
        title={() => (
          <Button
            type="primary"
            style={{ marginBottom: 16, width: 100 }}
            onClick={handleClickCreate}
          >
            新建角色
          </Button>
        )}
        columns={columns}
        rowKey="role_id"
      />
      <Modal
        forceRender
        destroyOnClose
        width={700}
        title={`${modalTypeText}角色`}
        visible={visible}
        onCancel={close}
        onOk={handleSubmit}
      >
        <Form form={modalForm} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {generateFormItem(modalFields)}
        </Form>
      </Modal>
    </>
  )
}

export default UserRole
