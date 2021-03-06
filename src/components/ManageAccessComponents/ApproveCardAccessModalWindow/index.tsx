import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IApproveCardAccessModalWindowProps {
  data: {
    id: string
    userNameColor: string
    userNameLabelColor: string
    userNameShortLabel: string
    cardNumber: string
    accountLinked: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
      isHide?: boolean
      queryHide: boolean
    }[]
    expandData: {
      areaTitle: string
      fieldList: {
        fieldType: string
        fieldName: string
        fieldValue: string
      }[]
    }
  } | null
  onClose?: any
  onApprove?: any
  onReject?: any
}

const ApproveCardAccessModalWindow: React.FunctionComponent<IApproveCardAccessModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const [data, setData] = useState(props.data)

  useEffect(() => {
    if (props.data) {
      setData(props.data)
    }
  }, [props.data])

  // get Current Date
  const getCurrentDate = () => {
    const str = new Date().toDateString()

    return str
  }

  // get Current Time
  const getCurrentTime = () => {
    const str = new Date().toLocaleTimeString()

    return str
  }

  return (
    <div className="modal-default approve-card-access-modal">
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close label-transparent"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          {_t('common.btns.close')}
        </a>
        <div className="title-area">
          <div className="blue-title">{t('approve_card_access')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="items">
              <div className="label-txt">{t('this_user_requested_access')}</div>
            </div>
          </div>
          <div className="row-line">
            <div className="spacing user-name">
              <div
                className="avatar"
                style={{
                  backgroundColor: `${data?.userNameColor}`,
                  color: `${data?.userNameLabelColor}`,
                }}
              >
                {data?.userNameShortLabel}
              </div>
              <span className="txt">
                <strong>{data?.fieldList[0].fieldValue}</strong>
                <span className="bottom-txt">{data?.fieldList[2].fieldValue}</span>
              </span>
            </div>
          </div>
          <div className="row-line">
            <div className="items half">
              <div className="field-label-txt">{t('card_number')}</div>
              <div className="control-item">{data?.cardNumber}</div>
            </div>
            <div className="items half">
              <div className="field-label-txt">{t('account_linked')}</div>
              <div className="control-item">{data?.accountLinked}</div>
            </div>
            <div className="items half">
              <div className="field-label-txt">{t('requested_date')}</div>
              <div className="control-item">{getCurrentDate()}</div>
            </div>
            <div className="items half">
              <div className="field-label-txt">{t('requested_time')}</div>
              <div className="control-item">{getCurrentTime()}</div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={_t('common.btns.approve')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onApprove(data)
            }}
          />

          <BaseTextLinkButton
            label={_t('common.btns.reject')}
            href={'#javascript'}
            onClick={() => {
              props.onReject()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ApproveCardAccessModalWindow
