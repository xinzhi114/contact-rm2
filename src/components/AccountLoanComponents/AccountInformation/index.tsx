import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface IAccountInformationProps {
  t: any
  dataList: {
    fieldName: string
    fieldValue: string
  }[]
  accountClosureRequestSuccess?: any
}

interface IAccountInformationState {
  isOpend: boolean
  showMoreDetails: boolean
}

export class AccountInformation extends Component<
  IAccountInformationProps,
  IAccountInformationState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: false,
      showMoreDetails: false,
    }
  }

  render() {
    const { t } = this.props
    const { dataList } = {
      ...this.props,
    }
    const { isOpend, showMoreDetails } = { ...this.state }

    return (
      <div className={`white-panel ${isOpend ? 'open' : ''}`}>
        <div className="title-bar flex-grid">
          <div className="blue-title">
            {t('accountsDashboard.accountInformation.account_information')}
          </div>
        </div>

        <div className="expend-boxs">
          {!!dataList && (
            <div className="group flex">
              {dataList.map((item, index) => (
                <div className={`items ${index > 9 && !showMoreDetails ? 'hide' : ''}`} key={index}>
                  <div className="label-txt">{item.fieldName}</div>
                  <div className="values" dangerouslySetInnerHTML={{ __html: item.fieldValue }} />
                </div>
              ))}

              {dataList.length > 10 && (
                <div className="center-more">
                  <a
                    href="#javascript"
                    className="icons link-arrow"
                    onClick={(event) => {
                      this.setState({ showMoreDetails: !showMoreDetails })
                      event.preventDefault()
                    }}
                  >
                    {showMoreDetails
                      ? t('accountsDashboard.accountInformation.less_details')
                      : t('accountsDashboard.accountInformation.more_details')}
                    <i className={`icons icon-drop ${showMoreDetails ? 'expanded' : ''}`} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(AccountInformation)
