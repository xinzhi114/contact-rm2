import React, { useEffect, useState } from 'react'
import MessageInfoError from '../ToastComponents/MessageInfoError'
import { values, noop } from 'lodash'
export const MESSAGE_TIMEOUT = 10 * 1000

/**
 * modal data
 */
export interface ModalData extends ModalId {
  child: any
  onClose?: () => void
}

export interface ModalId {
  id: number
}

/**
 * toast instance with data
 */
const gModals: any = {}

/**
 * toast message root
 */
export const ToastRoot = () => {
  const [modals, setModals] = useState<any>({})

  const addModal = (modalData: ModalData) => {
    gModals[modalData.id] = modalData
    setModals({ ...gModals })
  }
  const removeModal = (id: number) => {
    delete gModals[id]
    setModals({ ...gModals })
  }
  useEffect(() => {
    ToastService.showError = (msg) => {
      const id = Date.now()
      addModal({
        id,
        child: (
          <MessageInfoError
            timeout={MESSAGE_TIMEOUT}
            onClose={() => removeModal(id)}
            realTxt
            messageText={msg}
          />
        ),
      })
    }
    return () => {
      ToastService.showError = noop
    }
  }, [])
  return (
    <React.Fragment>
      {values(modals).map((modalData) => (
        <React.Fragment key={modalData.id}>{modalData.child}</React.Fragment>
      ))}
    </React.Fragment>
  )
}

export class ToastService {
  static showError: (msg: string) => void
}

/**
 * show error message
 * @param message the message
 */
export const showErrorMsg = (message: string) => {
  ToastService.showError(message)
}
