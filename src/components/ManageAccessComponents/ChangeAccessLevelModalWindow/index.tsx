import React, { useEffect, useState } from 'react'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IChangeAccessLevelModalWindowProps {
  data: {
    userNameColor?: string
    userNameLabelColor?: string
    userNameShortLabel?: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
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
  onConfirm?: any
}

const receiveAlertsOptions = [
  'Full access',
  'Input payment only',
  'Approve payment only',
  'No external payment',
  'View only',
]
const ChangeAccessLevelModalWindow: React.FunctionComponent<IChangeAccessLevelModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const [radioFieldsSelection, setRadioFieldsSelection] = useState('')

  useEffect(() => {
    if (props.data) {
      setRadioFieldsSelection(props.data.fieldList[2].fieldValue)
    }
  }, [props.data])

  // handle Input Change
  const handleInputChange = (fieldName: string) => {
    setRadioFieldsSelection(fieldName)
  }

  const { data } = { ...props }

  return (
    <div className={`modal-default change-access-level-modal gray-bg`}>
      <div className="modal-mains">
        <a
          href="#javascript"
          className="btn-close"
          onClick={(event) => {
            props.onClose()
            event.preventDefault()
          }}
        >
          &nbsp;
        </a>
        <div className="title-area">
          <div className="blue-title">{t('change_access_level')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="white-txt">{t('select_the_access_level')}</div>

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
                  <span className="bottom-txt">
                    {data?.fieldList[1].fieldValue} {t('cards_linked')}
                  </span>
                </span>
              </div>
            </div>

            <div className="center-info">
              <div className="white-txt bold-txt">{t('receive_alerts')}</div>

              <div className="four-checkradio">
                {receiveAlertsOptions.map((item, index) => (
                  <div className="radio-wrap" key={index}>
                    <input
                      type="radio"
                      name="receive-alerts"
                      id={`receive-alerts-${index}`}
                      checked={item === radioFieldsSelection}
                      onChange={() => handleInputChange(item)}
                    />
                    <label htmlFor={`receive-alerts-${index}`}>{t(`${item}`)}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={_t('common.btns.save')}
            isButton
            onClick={() => {
              props.onConfirm(radioFieldsSelection)
            }}
          />

          <BaseTextLinkButton
            label={_t('common.btns.cancel')}
            onClick={() => {
              props.onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChangeAccessLevelModalWindow
