import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface ITodaysInsightProps {
  t: any
  isEditMode?: boolean
  dataList: {
    fieldName: string
    fieldValue: string
  }[]
}

interface ITodaysInsightState {
  isOpend: boolean
}

export class TodaysInsight extends Component<ITodaysInsightProps, ITodaysInsightState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
    }
  }

  render() {
    const { t } = this.props
    const { isEditMode, dataList } = { ...this.props }
    const { isOpend } = { ...this.state }

    return (
      <div className={`white-panel ${isOpend ? 'open' : ''}`}>
        <div className="title-bar flex-grid">
          <div className="blue-title">
            {isEditMode && <i className="icons icon-four-arrow" />}
            {t('accountsDashboard.todaysInsight.today_insight')}
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
          {!!dataList && (
            <div className="group flex-grid">
              {dataList.map((item, index) => (
                <div className="items" key={index}>
                  <div className="label-txt">{item.fieldName}</div>
                  <div className="values">{item.fieldValue}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(TodaysInsight)
