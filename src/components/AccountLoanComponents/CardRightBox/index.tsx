import React, { Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../../store/actions/dataAction'
import formValidationSvc from '../../../services/formValidationSvc'
import * as _ from 'lodash'
import IconSetting from '../IconSetting'
import { BaseTextInput } from '../../../components/BaseForm/BaseFormFields/BaseTextInput'
import { BaseTextLinkButton } from '../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import PINNumberForm from '../../../components/AccountLoanComponents/PINNumberForm'
import { MobileBankingApproveModal } from '../../../components/Modals/MobileBankingApproveModal'
import './styles.scss'

interface ICardRightBoxProps {
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

interface ICardRightBoxState {
  dataList?: {
    type: string
    iconUrl: string
    title: string
    description: string
    rightGrayText: string
    actived: boolean
  }[]
  rowIndex?: number
  showActivateDebitCardPopup?: boolean
  showActivateDebitCardError?: boolean
  showRevealPINCVVPopup?: boolean
  showRevealPINCVVError?: boolean
  showEditPINNumber?: boolean
  isShowCardActivationRequestSubmittedModalWindow?: boolean
  isShowPINNumberChangedModalWindow?: boolean
  isShowApproveRevealPINCVVModalWindow?: boolean
  isShowApproveEditPINNumberModalWindow?: boolean
  cvvCard?: string
  optCode?: string
}

export class CardRightBox extends Component<ICardRightBoxProps, ICardRightBoxState> {
  constructor(props: any) {
    super(props)

    this.state = {
      dataList: _.cloneDeep(this.props.dataList),
      rowIndex: -1,
      showActivateDebitCardPopup: false,
      showActivateDebitCardError: false,
      showRevealPINCVVPopup: false,
      showRevealPINCVVError: false,
      showEditPINNumber: false,
      isShowCardActivationRequestSubmittedModalWindow: false,
      isShowPINNumberChangedModalWindow: false,
      isShowApproveRevealPINCVVModalWindow: false,
      isShowApproveEditPINNumberModalWindow: false,
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
          rowIndex: -1,
          showActivateDebitCardPopup: false,
          showActivateDebitCardError: false,
          showRevealPINCVVPopup: false,
          showRevealPINCVVError: false,
          showEditPINNumber: false,
          isShowCardActivationRequestSubmittedModalWindow: false,
          isShowPINNumberChangedModalWindow: false,
          isShowApproveRevealPINCVVModalWindow: false,
          isShowApproveEditPINNumberModalWindow: false,
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
        showRevealPINCVVPopup: false,
        isShowApproveRevealPINCVVModalWindow: true,
        rowIndex: index,
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
        isShowCardActivationRequestSubmittedModalWindow: true,
        cvvCard: '',
      })

      this.handleCheckChange(index, true)
      // this.props.setActivate()
    } else {
      this.setState({
        showActivateDebitCardError: true,
      })
    }
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
      str += isNaN(parseInt(element, 10)) ? element : '*'
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
    const { t } = this.props
    const {
      dataList,
      rowIndex,
      showActivateDebitCardPopup,
      showActivateDebitCardError,
      showRevealPINCVVPopup,
      showRevealPINCVVError,
      showEditPINNumber,
      isShowCardActivationRequestSubmittedModalWindow,
      isShowPINNumberChangedModalWindow,
      isShowApproveRevealPINCVVModalWindow,
      isShowApproveEditPINNumberModalWindow,
      cvvCard,
      optCode,
    } = { ...this.state }

    return (
      <div className="card-right-boxs">
        {isShowCardActivationRequestSubmittedModalWindow && (
          <GeneralConfirmModalWindow
            titleText={t('accountsDashboard.cardRightBox.card_activation_request_submitted')}
            messageText={`${t(
              'accountsDashboard.cardRightBox.your_request_for_card_activation_submitted'
            )}`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({
                isShowCardActivationRequestSubmittedModalWindow: false,
              })
            }}
          />
        )}

        {isShowPINNumberChangedModalWindow && (
          <GeneralConfirmModalWindow
            titleText={t('accountsDashboard.cardRightBox.pin_number_changed')}
            messageText={`${t(
              'accountsDashboard.cardRightBox.pin_number_has_been_changed_successfully'
            )}`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({
                isShowPINNumberChangedModalWindow: false,
              })
            }}
          />
        )}

        {isShowApproveRevealPINCVVModalWindow && (
          <MobileBankingApproveModal
            onApproved={() => {
              this.setState({
                isShowApproveRevealPINCVVModalWindow: false,
              })
              this.handleCheckChange(rowIndex || 0, true)
            }}
          />
        )}

        {isShowApproveEditPINNumberModalWindow && (
          <MobileBankingApproveModal
            onApproved={() => {
              this.setState({
                isShowApproveEditPINNumberModalWindow: false,
                showEditPINNumber: false,
                isShowPINNumberChangedModalWindow: true,
              })
            }}
          />
        )}

        {!showEditPINNumber && (
          <div className="title-line-bar ">
            <i className="icons icon-card" />
            <span className="txt">{t('accountsDashboard.cardRightBox.manage_debit_card')}</span>
          </div>
        )}

        {showEditPINNumber && (
          <div className="title-line-bar ">
            <i className="icons icon-pin-number" />
            <span className="txt">{t('accountsDashboard.cardRightBox.pin_number')}</span>
          </div>
        )}

        {!!dataList && showEditPINNumber && (
          <PINNumberForm
            onSave={() => {
              this.setState({ isShowApproveEditPINNumberModalWindow: true })
            }}
            onCancel={() => {
              this.setState({ showEditPINNumber: false })
            }}
          />
        )}

        {!!dataList && !showEditPINNumber && (
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
                    {item.actived
                      ? item.rightGrayText
                      : item.type !== 'activateDebitCard'
                      ? this.getMaskText(item.rightGrayText)
                      : ''}
                  </span>
                  {item.type !== 'activateDebitCard' &&
                    item.type !== 'lockDebitCard' &&
                    item.type !== 'blockDebitCard' &&
                    item.type !== 'cardLimit' &&
                    item.type !== 'internationalUsage' &&
                    item.type !== 'pinNumber' && (
                      <IconSetting isActive={false} onClick={() => null} />
                    )}
                  {item.type !== 'activateDebitCard' &&
                    item.type !== 'revealPINCVV' &&
                    item.type !== 'pinNumber' && (
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

                  {item.type === 'pinNumber' && (
                    <BaseTextLinkButton
                      classNameContainer={'btn-change'}
                      label={t('common.btns.change')}
                      href={'#javascript'}
                      isButton={true}
                      onClick={() => {
                        this.setState({ showEditPINNumber: true })
                      }}
                    />
                  )}

                  {item.type === 'activateDebitCard' && (
                    <div className={`setting-wrap ${showActivateDebitCardPopup ? 'open' : ''}`}>
                      <div className="check-round-wrap">
                        <input
                          type="checkbox"
                          id={`check-${index}`}
                          readOnly={true}
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
                            isButton={true}
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
                          readOnly={true}
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
                            isButton={true}
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

export default connect(mapStateToProps, matchDispatchToProps)(CardRightBox)
