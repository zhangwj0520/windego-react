import { useState } from 'react'

type ModalTypeEnum = 'create' | 'modify'
interface UseModalResult {
  visible: boolean
  open: (type?: ModalTypeEnum) => void
  close: () => void
  modalType: ModalTypeEnum
  modalTypeText: string
  setModalType: (type: ModalTypeEnum) => void
}

/**
 * 使用 antd Modal, 自带新建和修改两种类型
 * @param {boolean} initVisible 初始值
 * @return {{visible: boolean, open: function, close: function}} []
 */
const useModal = (initVisible?: boolean): UseModalResult => {
  const [visible, setVisible] = useState<boolean>(initVisible || false)
  const [modalType, setModalType] = useState<ModalTypeEnum>('create')

  const open = (type: ModalTypeEnum = 'create') => {
    setModalType(type)
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  return {
    visible,
    open,
    close,
    modalType,
    modalTypeText: modalType === 'create' ? '新建' : '修改',
    setModalType,
  }
}
export default useModal
