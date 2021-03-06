import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IAccountInformationModalWindowProps {
  dataList: {
    fieldName: string
    fieldValue: string
  }[]
  onClose?: any
}

const AccountInformationModalWindow: React.FunctionComponent<IAccountInformationModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const [dataList] = useState(props.dataList)

  return (
    <div className="modal-default quick-actions-account-information-modal">
      {!!dataList && (
        <div className="modal-mains">
          <a
            href="#javascript"
            className="btn-close label-transparent"
            onClick={(event) => {
              props.onClose()
              event.preventDefault()
            }}
          >
            {t('common.btns.close')}
          </a>
          <div className="title-area">
            <div className="blue-title">
              {t('accountsDashboard.quickActions.account_information')}
            </div>
          </div>

          <div className="modal-info">
            <div className="row-line flex">
              {dataList.map((item, index) => (
                <div className="group" key={index}>
                  <div className="label-txt">{item.fieldName}</div>
                  <div
                    className="values-txt"
                    dangerouslySetInnerHTML={{ __html: item.fieldValue }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountInformationModalWindow
