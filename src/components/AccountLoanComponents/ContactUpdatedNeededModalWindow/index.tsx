import React, { useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../../store/actions/dataAction'
import { useTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface IContactUpdatedNeededModalWindowProps {
  manageProfile?: {
    dataList?: {
      phoneNumber: string
      workPhoneNumber: string
      emailAddress: string
      tradingAddress: string
      correspondenceAddress: string
    }
  }
  dataAction?: any
  onConfirm?: any
  onUpdate?: any
  onClose?: any
}

const ContactUpdatedNeededModalWindow: React.FunctionComponent<IContactUpdatedNeededModalWindowProps> = (
  props
) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.dataAction.getManageProfileData()
  }, [props.dataAction])

  const { dataList } = { ...props.manageProfile }

  return (
    <div className="modal-default contact-updated-needed-modal">
      {dataList && (
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
            <div className="blue-title">{t('manageProfile.contact_update_needed')}</div>
          </div>

          <div className="modal-info">
            <div className="row-line">{t('manageProfile.your_contact_details_below')}</div>
            <div className="gray-wrap">
              <div className="row-groups">
                <div className="bold-title">{t('manageProfile.phone')}</div>
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">{t('manageProfile.phone_number')}</div>
                    <div className="value-txt">{dataList.phoneNumber}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">{t('manageProfile.work_phone_number')}</div>
                    <div className="value-txt">{dataList.workPhoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="bold-title">{t('manageProfile.email')}</div>
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">{t('manageProfile.email_address')}</div>
                    <div className="value-txt">{dataList.emailAddress}</div>
                  </div>
                </div>
              </div>
              <div className="row-groups">
                <div className="bold-title">{t('manageProfile.address')}</div>
                <div className="row-list">
                  <div className="items">
                    <div className="label-txt">{t('manageProfile.trading_address')}</div>
                    <div className="value-txt">{dataList.tradingAddress}</div>
                  </div>
                  <div className="items">
                    <div className="label-txt">{t('manageProfile.correspondence_address')}</div>
                    <div className="value-txt">{dataList.correspondenceAddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-btns">
            <BaseTextLinkButton
              label={t('common.btns.confirm_my_contact_details')}
              isButton={true}
              onClick={() => {
                props.onConfirm()
              }}
            />

            <BaseTextLinkButton
              label={t('common.btns.update_my_contact_details')}
              isButton={true}
              href={'/accountsDashboardPage/manageProfile'}
              isNavLink={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(ContactUpdatedNeededModalWindow)
