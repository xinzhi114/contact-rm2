import React, { Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../../store/actions/dataAction'
import formValidationSvc from '../../../services/formValidationSvc'
import * as _ from 'lodash'
import IconSetting from '../../../components/AccountLoanComponents/IconSetting'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import './styles.scss'

interface ICardAccessRightBoxProps {
  t: any
  cvvCard?: {
    dataList: {
      cvvCardValue: string
    }
  }
  opt?: {
    dataList: {
      optValue: string
    }
  }
  userAccessLevelData: {
    userNameColor: string
    userNameLabelColor: string
    userNameShortLabel: string
    fieldList: {
      fieldType: string
      fieldName: string
      fieldValue: string
      queryHide: boolean
    }[]
  }
  cardDetails: {
    bankName: string
    cardType: string
    fieldList: {
      label: string
      value: string
    }[]
    manageDebitCard: {
      type: string
      iconUrl: string
      title: string
      description: string
      rightGrayText: string
      actived: boolean
    }[]
  }
  dataList: {
    type: string
    iconUrl: string
    title: string
    description: string
    rightGrayText: string
    actived: boolean
  }[]
  dataAction?: any
  confirm?: any
  setActivate?: any
}

interface ICardAccessRightBoxState {
  dataList?: {
    type: string
    iconUrl: string
    title: string
    description: string
    rightGrayText: string
    actived: boolean
  }[]
  showActivateDebitCardPopup?: boolean
  showActivateDebitCardError?: boolean
  showActivateDebitCardPendingPanel?: boolean
  showRevealPINCVVPopup?: boolean
  showRevealPINCVVError?: boolean
  showApprovedCardAccessModal?: boolean
  showRejectedCardAccessModal?: boolean
  cvvCard?: string
  optCode?: string
}

export class CardAccessRightBox extends Component<
  ICardAccessRightBoxProps,
  ICardAccessRightBoxState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      dataList: _.cloneDeep(this.props.dataList),
      showActivateDebitCardPopup: false,
      showActivateDebitCardError: false,
      showActivateDebitCardPendingPanel: false,
      showRevealPINCVVPopup: false,
      showRevealPINCVVError: false,
      showApprovedCardAccessModal: false,
      showRejectedCardAccessModal: false,
      cvvCard: '',
      optCode: '',
    }
  }

  componentDidMount() {
    this.props.dataAction.getOPTData()
    this.props.dataAction.getCVVCardData()
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.dataList !== prevProps.dataList) {
      if (this.props.dataList) {
        this.setState({
          dataList: _.cloneDeep(this.props.dataList),
          showActivateDebitCardPopup: false,
          showActivateDebitCardError: false,
          showActivateDebitCardPendingPanel: false,
          showRevealPINCVVPopup: false,
          showRevealPINCVVError: false,
          showApprovedCardAccessModal: false,
          showRejectedCardAccessModal: false,
          cvvCard: '',
          optCode: '',
        })
      }
    }
  }

  // click Activate Debit Card Checkbox
  clickActivateDebitCardCheckbox(index: number) {
    if (this.state.dataList && !this.state.dataList[index].actived) {
      this.setState({
        showActivateDebitCardPopup: true,
      })
    } else {
      this.handleCheckChange(index, false)
    }
  }

  // click Reveal PIN CVV Checkbox
  clickRevealPINCVVCheckbox(index: number) {
    if (this.state.dataList && !this.state.dataList[index].actived) {
      this.setState({
        showRevealPINCVVPopup: true,
      })
    } else {
      this.handleCheckChange(index, false)
    }
  }

  // click Confirm Activate Debit Card
  clickConfirmActivateDebitCard(index: number) {
    if (
      this.state.cvvCard ===
      (this.props.cvvCard !== undefined ? this.props.cvvCard.dataList.cvvCardValue : '')
    ) {
      this.setState({
        showActivateDebitCardPopup: false,
        showActivateDebitCardError: false,
        cvvCard: '',
      })

      this.handleCheckChange(index, true)

      this.setState({
        showActivateDebitCardPendingPanel: true,
      })
    } else {
      this.setState({
        showActivateDebitCardError: true,
      })
    }
  }

  // get Current Date
  getCurrentDate() {
    const str = new Date().toDateString()

    return str
  }

  // click Confirm Reveal PIN CVV
  clickConfirmRevealPINCVV(index: number) {
    if (
      this.state.optCode === (this.props.opt !== undefined ? this.props.opt.dataList.optValue : '')
    ) {
      this.setState({
        showRevealPINCVVPopup: false,
        showRevealPINCVVError: false,
        optCode: '',
      })

      this.handleCheckChange(index, true)
    } else {
      this.setState({
        showRevealPINCVVError: true,
      })
    }
  }

  // get Mask Text
  getMaskText(value: string) {
    let str = ''
    for (const element of value) {
      str += element ? '*' : ''
    }
    return str
  }

  // handle Check Change
  handleCheckChange(index: number, checked: boolean) {
    const dataList: any = this.state.dataList

    dataList[index].actived = checked

    if (checked) {
      const today = new Date()

      if (dataList[index].type === 'lockDebitCard') {
        dataList[
          index
        ].description = `Locked on ${today.toDateString()} ${today.toLocaleTimeString()}`
      }

      if (dataList[index].type === 'blockDebitCard') {
        dataList[
          index
        ].description = `Blocked on ${today.toDateString()} ${today.toLocaleTimeString()}`
      }

      if (dataList[index].type === 'cardLimit') {
        dataList[
          index
        ].description = `Limited on ${today.toDateString()} ${today.toLocaleTimeString()}`
      }

      if (dataList[index].type === 'internationalUsage') {
        dataList[
          index
        ].description = `Actived on ${today.toDateString()} ${today.toLocaleTimeString()}`
      }

      if (dataList[index].type === 'cancelAndReplaceCard') {
        dataList[
          index
        ].description = `Replaced on ${today.toDateString()} ${today.toLocaleTimeString()}`
      }
    }

    this.setState({
      dataList,
    })
  }

  // handle Input Change
  handleInputChange(fieldName: string, event: any, fieldNameValueCurrent?: string) {
    this.setState({
      [fieldName]: formValidationSvc.validateInputEnteringPattern(event, fieldNameValueCurrent),
    })
  }

  render() {
    const { t, userAccessLevelData, cardDetails } = this.props
    const {
      dataList,
      showActivateDebitCardPopup,
      showActivateDebitCardError,
      showActivateDebitCardPendingPanel,
      showRevealPINCVVPopup,
      showRevealPINCVVError,
      showApprovedCardAccessModal,
      showRejectedCardAccessModal,
      cvvCard,
      optCode,
    } = { ...this.state }

    return (
      <div className="card-right-boxs">
        {showApprovedCardAccessModal && (
          <GeneralConfirmModalWindow
            titleText={t('manageAccess.cardRightBox.approved_card_access_successfully')}
            messageText={`${t(
              'manageAccess.cardRightBox.you_have_successfully_approved'
            )} <strong>${cardDetails.fieldList[0].value}</strong> ${t(
              'manageAccess.cardRightBox.for'
            )} <strong>${cardDetails.fieldList[5].value}</strong>`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({ showApprovedCardAccessModal: false })
              this.props.setActivate()
            }}
          />
        )}

        {showRejectedCardAccessModal && (
          <GeneralConfirmModalWindow
            titleText={t('manageAccess.cardRightBox.rejected_card_access_successfully')}
            messageText={`${t(
              'manageAccess.cardRightBox.you_have_successfully_rejected'
            )} <strong>${cardDetails.fieldList[0].value}</strong> ${t(
              'manageAccess.cardRightBox.for'
            )} <strong>${cardDetails.fieldList[5].value}</strong>`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({ showRejectedCardAccessModal: false })
              this.setState({ showActivateDebitCardPendingPanel: false })
            }}
          />
        )}

        <div className="title-line-bar ">
          <i className="icons icon-card" />
          <span className="txt">{t('accountsDashboard.cardRightBox.manage_debit_card')}</span>
        </div>
        {showActivateDebitCardPendingPanel && (
          <div className="pending-approval">
            <div className="title-txt">Pending approval</div>
            <div className="center-area">
              <div className="description-txt">
                This user requested access for this card and need your approval to continue.
              </div>
              <div className="data-summary">
                <div className="left-area">
                  <div className="spacing user-name">
                    <div
                      className="avatar"
                      style={{
                        backgroundColor: `${userAccessLevelData?.userNameColor}`,
                        color: `${userAccessLevelData?.userNameLabelColor}`,
                      }}
                    >
                      {userAccessLevelData.userNameShortLabel}
                    </div>
                    <span className="txt">
                      <strong>{userAccessLevelData.fieldList[0].fieldValue}</strong>
                      <span className="bottom-txt">
                        {userAccessLevelData.fieldList[2].fieldValue}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="right-area">
                  <div className="br-uppercase">Requested on</div>
                  <strong className="br-strong">{this.getCurrentDate()}</strong>
                </div>
              </div>
            </div>
            <div className="bottom-area">
              <BaseTextLinkButton
                label={t('common.btns.approve')}
                href={'#javascript'}
                isButton={true}
                onClick={() => {
                  this.setState({ showApprovedCardAccessModal: true })
                }}
              />

              <BaseTextLinkButton
                label={t('common.btns.reject')}
                href={'#javascript'}
                onClick={() => {
                  this.setState({ showRejectedCardAccessModal: true })
                }}
              />
            </div>
          </div>
        )}

        {!!dataList && !showActivateDebitCardPendingPanel && (
          <div className="debit-card-list">
            {dataList.map((item, index) => (
              <div className="row-line flex-grid" key={index}>
                <div className="lefts">
                  <img src={item.iconUrl} className="icons" alt="img" />
                  <div className="right-txt">
                    <div className="blue-txt">{item.title}</div>
                    {item.actived && <div className="green-txt">{item.description}</div>}
                  </div>
                </div>
                <div className="rights">
                  <span className="gray-bold">
                    {item.actived ? item.rightGrayText : this.getMaskText(item.rightGrayText)}
                  </span>
                  {item.type !== 'activateDebitCard' &&
                    item.type !== 'lockDebitCard' &&
                    item.type !== 'blockDebitCard' &&
                    item.type !== 'cardLimit' &&
                    item.type !== 'internationalUsage' && (
                      <IconSetting isActive={false} onClick={() => null} />
                    )}
                  {item.type !== 'activateDebitCard' && item.type !== 'revealPINCVV' && (
                    <div className="check-round-wrap">
                      <input
                        type="checkbox"
                        id={`check-${index}`}
                        checked={item.actived}
                        onChange={(event) => this.handleCheckChange(index, event.target.checked)}
                      />
                      <label htmlFor={`check-${index}`} />
                    </div>
                  )}

                  {item.type === 'activateDebitCard' && (
                    <div className={`setting-wrap ${showActivateDebitCardPopup ? 'open' : ''}`}>
                      <div className="check-round-wrap">
                        <input
                          type="checkbox"
                          id={`check-${index}`}
                          readOnly
                          checked={item.actived}
                          onClick={() => this.clickActivateDebitCardCheckbox(index)}
                        />
                        <label htmlFor={`check-${index}`} />
                      </div>
                      <div className="tip-panel activate-debit-card">
                        <div className="top-txt">
                          <div className="icon-txt">
                            <i className="icons icon-lock" />
                            <p className="txt">
                              {t('accountsDashboard.cardRightBox.please_enter_cvv')}
                            </p>
                          </div>
                        </div>
                        <div className="otp-boxs">
                          <div className="otp-title flex-grid">
                            <div className="lefts">
                              {t('accountsDashboard.cardRightBox.cvv_card')}
                            </div>
                          </div>
                          <div>
                            <BaseTextInput
                              id="cvvCard"
                              showError={showActivateDebitCardError}
                              errorMessageLabel={''}
                              placeholder="---"
                              pattern="[0-9]{0,3}"
                              value={cvvCard ? cvvCard : ''}
                              onChange={(event) =>
                                this.handleInputChange('cvvCard', event, cvvCard)
                              }
                            />
                          </div>
                        </div>
                        <div className="bottom-btns flex-grid">
                          <BaseTextLinkButton
                            classNameContainer={cvvCard === '' ? 'disabled' : ''}
                            label={t('common.btns.activate')}
                            href={'#javascript'}
                            isButton
                            onClick={() => {
                              this.clickConfirmActivateDebitCard(index)
                            }}
                          />

                          <BaseTextLinkButton
                            label={t('common.btns.cancel')}
                            href={'#javascript'}
                            onClick={() => {
                              this.setState({ showActivateDebitCardPopup: false })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === 'revealPINCVV' && (
                    <div className={`setting-wrap ${showRevealPINCVVPopup ? 'open' : ''}`}>
                      <div className="check-round-wrap">
                        <input
                          type="checkbox"
                          id={`check-${index}`}
                          readOnly
                          checked={item.actived}
                          onClick={() => this.clickRevealPINCVVCheckbox(index)}
                        />
                        <label htmlFor={`check-${index}`} />
                      </div>
                      <div className="tip-panel reveal-pin-cvv">
                        <div className="top-txt">
                          <div className="icon-txt">
                            <i className="icons icon-lock" />
                            <p className="txt">{t('accountsDashboard.cardRightBox.an_otp')}</p>
                          </div>
                        </div>
                        <div className="otp-boxs">
                          <div className="otp-title flex-grid">
                            <div className="lefts">{t('accountsDashboard.cardRightBox.otp')}</div>

                            <BaseTextLinkButton
                              label={t('accountsDashboard.cardRightBox.resend_otp')}
                              href={'#javascript'}
                              onClick={(event: any) => event.preventDefault()}
                            />
                          </div>
                          <div>
                            <BaseTextInput
                              id="optCode"
                              showError={showRevealPINCVVError}
                              errorMessageLabel={''}
                              placeholder="------"
                              pattern="[0-9]{0,8}"
                              value={optCode ? optCode : ''}
                              onChange={(event) =>
                                this.handleInputChange('optCode', event, optCode)
                              }
                            />
                          </div>
                          <div className="expires-txt">
                            {t('accountsDashboard.cardRightBox.otp_will_expires')}{' '}
                            <span className="bold">
                              {t('accountsDashboard.cardRightBox.seconds')}
                            </span>
                          </div>
                        </div>
                        <div className="bottom-btns flex-grid">
                          <BaseTextLinkButton
                            classNameContainer={optCode === '' ? 'disabled' : ''}
                            label={t('common.btns.confirm')}
                            href={'#javascript'}
                            isButton
                            onClick={() => {
                              this.clickConfirmRevealPINCVV(index)
                            }}
                          />

                          <BaseTextLinkButton
                            label={t('common.btns.cancel')}
                            href={'#javascript'}
                            onClick={() => {
                              this.setState({ showRevealPINCVVPopup: false })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(CardAccessRightBox)
