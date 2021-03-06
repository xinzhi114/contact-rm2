import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { FAQRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

export interface IFaqRightListProps {
  t: any
  faq: FAQRsp[]
}

interface IFaqRightListState {
  expanded: Record<number, boolean>
  isShownMore: boolean
}

export class FaqRightList extends Component<IFaqRightListProps, IFaqRightListState> {
  constructor(props: any) {
    super(props)

    this.state = {
      expanded: {},
      isShownMore: false,
    }
  }

  // click Show More
  clickShowMore() {
    this.setState({
      isShownMore: !this.state.isShownMore,
    })
  }

  // click Arrow
  clickArrow(index: number) {
    this.setState({ expanded: { ...this.state.expanded, [index]: !this.state.expanded[index] } })
  }

  render() {
    const { t, faq } = this.props
    const { isShownMore, expanded } = { ...this.state }

    return (
      <div className="card-list-boxs faq-right-content">
        <React.Fragment>
          <div className="title-line-bar mobile-hide">
            <img className="icons" alt="img" src={'/assets/icon-lock-blue@2x.png'} />
            <span className="txt">{faq[0].label}</span>
          </div>
          <div className="debit-card-list">
            {faq.map((item, index) => (
              <div
                key={index}
                className={`row-line ${isShownMore ? '' : index >= 9 ? 'hide' : ''}`}
              >
                <div className={`expend-wrap ${expanded[index] ? 'open' : ''}`}>
                  <a
                    className="expend-title flex-grid"
                    href="#javascript"
                    onClick={(event) => {
                      this.clickArrow(index)
                      event.preventDefault()
                    }}
                  >
                    <div className="title">{item.q}</div>
                    <span className="btn-expend" />
                  </a>
                  <div
                    className="expend-body"
                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                  />
                </div>
              </div>
            ))}

            <div className="row-bottom">
              {faq.length > 9 && (
                <BaseTextLinkButton
                  label={
                    isShownMore
                      ? t('helpSupport.faqInsightRightList.show_less')
                      : t('helpSupport.faqInsightRightList.show_more')
                  }
                  href={'#javascript'}
                  onClick={() => {
                    this.clickShowMore()
                  }}
                />
              )}
            </div>
          </div>
        </React.Fragment>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(FaqRightList)
