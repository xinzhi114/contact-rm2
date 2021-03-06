import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import moment from 'moment'

interface IReviewAndSubmitProps {
  t: any
  data: {
    fromAccount: string
    fromAccountNumber: string
    toAccount: string
    toAccountNumber: string
    transferDate: Date | undefined
    transferAmount: string
    fromAccountReference: string
  }
  individualBusiness: string
  clickBack?: any
  clickUpdateData?: any
  clickDelete?: any
  clickMakeTransfer?: any
}

interface IReviewAndSubmitState {
  data: {
    fromAccount: string
    fromAccountNumber: string
    toAccount: string
    toAccountNumber: string
    transferDate: Date | undefined
    transferAmount: string
    fromAccountReference: string
  }
}
export class ReviewAndSubmit extends Component<IReviewAndSubmitProps, IReviewAndSubmitState> {
  constructor(props: any) {
    super(props)

    this.state = {
      data: props.data,
    }
  }

  render() {
    const { t, individualBusiness } = this.props
    const { data } = this.state
    return (
      <div className="transfer-between-accounts-review-and-submit">
        <div className="black-title flex-grid">
          <div className="lefts">
            <a
              href="#javascript"
              className="icons icon-left-arrow label-transparent"
              onClick={(event) => {
                this.props.clickBack()
                event.preventDefault()
              }}
            >
              {t('common.btns.icon_left_arrow')}
            </a>
            {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.review_and_submit')}
          </div>

          <BaseTextLinkButton
            classNameContainer={'btn-update-data'}
            label={t('movePaymentTransferBetweenAccounts.reviewAndSubmit.update_data')}
            href={'#javascript'}
            isButton
            onClick={() => {
              this.props.clickUpdateData()
            }}
          />
        </div>
        <div className="review-submit-wrap">
          <div className="detail-group">
            <div className="group">
              <div className="top-title">
                {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.account_details')}
              </div>
              <div className="two-drop">
                <div className="items">
                  <div className="label-txt">
                    {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.from_account')}
                  </div>
                  <div className="values">{data.fromAccount}</div>
                  <i className="icons icon-rights-arrow">&nbsp;</i>
                </div>
                <div className="items">
                  <div className="label-txt">
                    {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.to_account')}
                  </div>
                  <div className="values">{data.toAccount}</div>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="top-title flex-grid">
                {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.transfer_details')}
              </div>
              <div className="two-drop ">
                <div className="items">
                  <div className="label-txt">
                    {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.transfer_amount')}
                  </div>
                  <div className="values">£ {data.transferAmount}</div>
                </div>
                <div className="items">
                  <div className="label-txt">
                    {individualBusiness === 'individual'
                      ? t('movePaymentTransferBetweenAccounts.reviewAndSubmit.reference')
                      : t(
                          'movePaymentTransferBetweenAccounts.reviewAndSubmit.from_account_reference'
                        )}
                  </div>
                  <div className="values">{data.fromAccountReference}</div>
                </div>
                <div className="items">
                  <div className="label-txt">
                    {t(
                      'movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_date'
                    )}
                  </div>
                  <div className="values">
                    {data.transferDate ? moment(data.transferDate).format('DD MMMM YYYY') : ''}
                  </div>
                </div>
                <div className="items" />
              </div>
            </div>
          </div>
          <div className="bottom-btn flex-col">
            <BaseTextLinkButton
              label={t('movePaymentTransferBetweenAccounts.reviewAndSubmit.make_transfer')}
              href={'#javascript'}
              isButton
              onClick={() => {
                this.props.clickMakeTransfer()
              }}
            />
            <a
              href="#javascript"
              className="red links"
              onClick={(event) => {
                this.props.clickDelete()
                event.preventDefault()
              }}
            >
              {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.delete')}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(ReviewAndSubmit)
