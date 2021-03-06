import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import formValidationSvc from '../../../../services/formValidationSvc'

interface IOrderGiroChequeBooksModalWindowProps {
  title: string
  deliveryAddress: string
  onClose?: any
  onSubmit?: any
}

const OrderGiroChequeBooksModalWindow: React.FunctionComponent<IOrderGiroChequeBooksModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  const { title, deliveryAddress } = { ...props }

  const [numberValue, setNumberValue] = useState('')

  // is Enabled Submit
  const isEnabledSubmit = () => {
    let pass = true

    if (numberValue === '' || parseInt(numberValue, 10) > 3) {
      pass = false
    }

    return pass
  }

  return (
    <div className="modal-default order-giro-cheque-books-amount-modal">
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
          <div className="blue-title">{t('accountsDashboard.quickActions.' + title)}</div>
        </div>

        <div className="modal-info">
          <div className="row-line">
            <div className="items">
              <div className="label-txt">
                {t(
                  'accountsDashboard.quickActions.' +
                    (title === 'order_cheque_books' ? 'number_of_cheque' : 'number_of_giro')
                )}
              </div>
              <div className="control-item">
                <BaseTextInput
                  id="numberValue"
                  placeholder={t('common.labels.enter_value')}
                  showError={parseInt(numberValue, 10) > 3}
                  errorMessageLabel={t('common.labels.wrong_format_number_of_cheque_giro')}
                  pattern="[0-9]*"
                  value={numberValue}
                  onChange={(event) =>
                    setNumberValue(
                      formValidationSvc.validateInputEnteringPattern(event, numberValue)
                    )
                  }
                />
              </div>
            </div>
            <div className="row-bottom-label">
              {t(
                'accountsDashboard.quickActions.' +
                  (title === 'order_cheque_books' ? 'maximum_3_cheque_book' : 'maximum_3_giro_book')
              )}
            </div>
          </div>
          <div className="row-line">
            <div className="items">
              <div className="label-txt">
                {t('accountsDashboard.quickActions.delivery_address')}
              </div>
              <div className="gray-item">{deliveryAddress}</div>
            </div>
            <div className="row-bottom-label">
              {t('accountsDashboard.quickActions.you_can_update_your_correspondence_address')}
            </div>
          </div>
        </div>

        <div className="bottom-btns">
          <BaseTextLinkButton
            classNameContainer={`${isEnabledSubmit() ? '' : 'disabled'}`}
            label={t('common.btns.submit')}
            href={'#javascript'}
            isButton
            onClick={() => {
              props.onSubmit()
            }}
          />

          <BaseTextLinkButton
            label={t('common.btns.cancel')}
            href={'#javascript'}
            onClick={(event: any) => {
              props.onClose()
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
export default OrderGiroChequeBooksModalWindow
