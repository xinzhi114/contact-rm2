import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'

interface ILoanInformationProps {
  t: any
  loanInformationShowMakePayment: boolean
  dataList: {
    fieldName: string
    fieldValue: string
  }[]
}

interface ILoanInformationState {
  isOpend: boolean
}

export class LoanInformation extends Component<ILoanInformationProps, ILoanInformationState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
    }
  }

  render() {
    const { t } = this.props
    const { loanInformationShowMakePayment, dataList } = { ...this.props }
    const { isOpend } = { ...this.state }

    return (
      <div className={`white-panel min-height-360 ${isOpend ? 'open' : ''}`}>
        <div className="title-bar flex-grid">
          <div className="blue-title">
            {t('accountsDashboard.loanInformation.loan_information')}
          </div>
          <div className="rights">
            <a
              href="#javascript"
              className="icons btn-setting label-transparent"
              onClick={(event) => event.preventDefault()}
            >
              {t('common.btns.setting')}
            </a>
            <a
              href="#javascript"
              className="icons btn-arrow label-transparent"
              onClick={(event) => {
                this.setState({ isOpend: !isOpend })
                event.preventDefault()
              }}
            >
              {t('common.btns.arrow')}
            </a>
          </div>
        </div>
        <div className="expend-boxs">
          <div className="group-wrap">
            {dataList &&
              dataList.map((item, index) => (
                <div className="group" key={index}>
                  <div className="label-txt">{item.fieldName}</div>
                  <div className="values" dangerouslySetInnerHTML={{ __html: item.fieldValue }} />
                </div>
              ))}
          </div>
          {loanInformationShowMakePayment && (
            <div className="center-btn">
              <BaseTextLinkButton
                label={t('accountsDashboard.loanInformation.make_payment')}
                href={'#javascript'}
                isButton
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(LoanInformation)
