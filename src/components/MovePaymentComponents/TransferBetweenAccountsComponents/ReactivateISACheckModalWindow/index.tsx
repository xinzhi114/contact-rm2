import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IReactivateISACheckModalWindowProps {
  onSubmit?: any
  onClose?: any
}

const ReactivateISACheckModalWindow: React.FunctionComponent<IReactivateISACheckModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()
  const [accept, setAccept] = useState(false)

  return (
    <div className="modal-default reactivate-isa-check-modal">
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
            {t('movePaymentTransferBetweenAccounts.reactivateISAModalWindow.reactivate_isa')}
          </div>
        </div>

        <div className="modal-info">
          <div className="info-reactivate">
            <p
              className="p-txt pb15"
              dangerouslySetInnerHTML={{
                __html: t(
                  'movePaymentTransferBetweenAccounts.reactivateISAModalWindow.information'
                ),
              }}
            />
          </div>
          <div className="row-line">
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                id="acceptCheck"
                checked={accept}
                onChange={(event) => setAccept(event.target.checked)}
              />
              <label htmlFor="acceptCheck">
                {t('movePaymentTransferBetweenAccounts.reactivateISAModalWindow.i_accept_the')}{' '}
                <span className="green-link">
                  {t(
                    'movePaymentTransferBetweenAccounts.reactivateISAModalWindow.declaration_of_isa'
                  )}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${accept ? '' : 'disabled'}`}
            label={t('common.btns.submit')}
            isButton={true}
            onClick={() => {
              props.onSubmit()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ReactivateISACheckModalWindow
