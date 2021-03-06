import React from 'react'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IAccessLevelChangedModalWindowProps {
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
  newAccessLevel: string
  onClose?: any
  onConfirm?: any
}

const AccessLevelChangedModalWindow: React.FunctionComponent<IAccessLevelChangedModalWindowProps> = (
  props
) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`manageAccess.${key}`)

  const { data, newAccessLevel } = { ...props }

  return (
    <div className="modal-default access-level-changed-modal">
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
          <div className="blue-title">{t('access_level_changed')}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="center-info">
              <div className="icons done-icons">
                <img src="/assets/Illustrations-confirm.svg" alt="svg" />
              </div>
              <div className="white-txt">{t('the_access_level_has_been_changed')}</div>
            </div>
          </div>
          <div className="bottom-data">
            <div className="group">
              <div className="top-label">{t('user_name')}</div>
              <div className="values">{data?.fieldList[0].fieldValue}</div>
            </div>
            <div className="group">
              <div className="top-label">{t('access_level')}</div>
              <div className="values">{newAccessLevel}</div>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            label={_t('common.btns.confirm')}
            href={'#javascript'}
            isButton
            onClick={(event: any) => {
              props.onConfirm()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AccessLevelChangedModalWindow
