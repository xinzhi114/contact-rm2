import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'
import './styles.scss'
import { FAQRsp } from '../../../common/Api/Domains/rsp/HelpRsp'

export interface IFaqInsightRightListProps {
  t: any
  faq: FAQRsp[]
}

interface IFaqInsightRightListState {
  expanded: Record<number, boolean>
  isShownMore: boolean
}

export class FaqInsightRightList extends Component<
  IFaqInsightRightListProps,
  IFaqInsightRightListState
> {
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
      <div className="card-list-boxs faq-insight-right-content">
        <React.Fragment>
          <div className="title-line-bar mobile-hide">
            <img className="icons" alt="img" src={'/assets/icon-insight@2x.png'} />
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
                  <div className="expend-body insight-expend">
                    <div className="flex-grid">
                      <div className="lefts">
                        <div className="list-txt">
                          {item.contents && item.contents.length > 0 && (
                            <ul>
                              {item.contents.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <span className="left-txt">-</span>&nbsp;
                                  <span
                                    className="txt"
                                    dangerouslySetInnerHTML={{ __html: subItem || '' }}
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div
                        className="right-txt"
                        dangerouslySetInnerHTML={{ __html: item.description || '' }}
                      />
                    </div>
                  </div>
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
export default withTranslation()(FaqInsightRightList)
