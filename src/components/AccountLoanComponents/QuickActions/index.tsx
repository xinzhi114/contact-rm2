import React, { Component } from 'react'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import AccountInformationModalWindow from '../QuickActionsModalsComponents/AccountInformationModalWindow'
import RequestClosureSubmittedModalWindow from '../QuickActionsModalsComponents/RequestClosureSubmittedModalWindow'
import OrderGiroChequeBooksModalWindow from '../QuickActionsModalsComponents/OrderGiroChequeBooksModalWindow'
import ChangeNominatedModalWindow from '../QuickActionsModalsComponents/ChangeNominatedModalWindow'
import ReactiveAccountModalWindow from '../QuickActionsModalsComponents/ReactiveAccountModalWindow'
import RequestClosureBusinessModalWindow from '../QuickActionsModalsComponents/RequestClosureBusinessModalWindow'
import RequestErrorModalWindow from '../QuickActionsModalsComponents/RequestErrorModalWindow'
import RequestClosureIndividualModalWindow from '../QuickActionsModalsComponents/RequestClosureIndividualModalWindow'
import AccountClosureSuccessModalWindow from '../QuickActionsModalsComponents/AccountClosureSuccessModalWindow'
import { ComposeEmailModal } from '../../HelpSupportComponents/ComposeEmailModal'
import { quickActionsMenuSettings, quickActionsConfirmModalSettings } from '../../../config'
import './styles.scss'

interface RequestClosureIndividualData {
  buttonLabel: string
  fromAccount: string
  fromAccountId: string
  toAccount: string
  toAccountId: string
  transferAmount: string
}

interface IQuickActionsProps extends RouteComponentProps<any> {
  t: any
  fromAccountList: {
    label: string
    value: string
    number: string
    availableBalance: string
  }[]
  accountName: string
  accountNumber: string
  customerId: string
  firstName: string
  lastName: string
  deliveryAddress: string
  dataList: {
    fieldName: string
    fieldValue: string
  }[]
  shownLoan: boolean
  individualBusiness: string
  shownClosed: boolean
  isEditMode?: boolean
}

interface IQuickActionsState {
  isOpend: boolean
  shownSubTab: string
  closureData: {
    composeType: string
    customerId: string
    accountNumber: string
    firstName: string
    lastName: string
    primaryContactNumber: string
    secondaryContactNumber: string
    companyRole: string
    emailId: string
    address: string
  }
  accountClosureData: RequestClosureIndividualData
  isShowNominatedChangedModalWindow: boolean
  isShowOrderChequeBooksRequestModalWindow: boolean
  isShowOrderChequeBooksRequestSubmittedModalWindow: boolean
  isShowOrderGiroBooksRequestModalWindow: boolean
  isShowOrderGiroBooksRequestSubmittedModalWindow: boolean
  isShowReactiveAccountRequestModalWindow: boolean
  isShowReactiveAccountRequestSubmittedModalWindow: boolean
  isShowAccountInformationModalWindow: boolean
  isShowRequestClosureBusinessModalWindow: boolean
  isShowRequestClosureComposeEmailModalWindow: boolean
  isShowRequestClosureSubmittedModalWindow: boolean
  isShowChangeNominatedModalWindow: boolean
  isShowRequestErrorModalWindow: boolean
  isShowRequestClosureIndividualModalWindow: boolean
  isShowAccountClosureSuccessModalWindow: boolean
}

export class QuickActions extends Component<IQuickActionsProps, IQuickActionsState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpend: true,
      shownSubTab: '',
      closureData: {
        composeType: 'request closure',
        customerId: props.customerId,
        accountNumber: props.accountNumber,
        firstName: props.firstName,
        lastName: props.lastName,
        primaryContactNumber: '',
        secondaryContactNumber: '',
        companyRole: '',
        emailId: '',
        address: '',
      },
      accountClosureData: {
        buttonLabel: '',
        fromAccount: '',
        fromAccountId: '',
        toAccount: '',
        toAccountId: '',
        transferAmount: '',
      },
      isShowNominatedChangedModalWindow: false,
      isShowOrderChequeBooksRequestModalWindow: false,
      isShowOrderChequeBooksRequestSubmittedModalWindow: false,
      isShowOrderGiroBooksRequestModalWindow: false,
      isShowOrderGiroBooksRequestSubmittedModalWindow: false,
      isShowReactiveAccountRequestModalWindow: false,
      isShowReactiveAccountRequestSubmittedModalWindow: false,
      isShowAccountInformationModalWindow: false,
      isShowRequestClosureBusinessModalWindow: false,
      isShowRequestClosureComposeEmailModalWindow: false,
      isShowRequestClosureSubmittedModalWindow: false,
      isShowChangeNominatedModalWindow: false,
      isShowRequestErrorModalWindow: false,
      isShowRequestClosureIndividualModalWindow: false,
      isShowAccountClosureSuccessModalWindow: false,
    }
  }

  componentDidUpdate(prevProps: any) {
    const closureDataTemp = this.state.closureData
    if (
      this.props.customerId !== prevProps.customerId &&
      this.props.accountNumber !== prevProps.accountNumber &&
      this.props.firstName !== prevProps.firstName &&
      this.props.lastName !== prevProps.lastName
    ) {
      closureDataTemp.customerId = prevProps.customerId
      closureDataTemp.accountNumber = prevProps.accountNumber
      closureDataTemp.firstName = prevProps.firstName
      closureDataTemp.lastName = prevProps.lastName

      this.setState({
        closureData: closureDataTemp,
      })
    }
  }

  // click Menu
  clickMenu(name: string) {
    this.setState({
      shownSubTab: name,
    })
  }

  getOptionData(shownSubTab: string) {
    switch (shownSubTab) {
      case 'payment_and_transfer':
        return quickActionsMenuSettings.paymentAndTransfer
      case 'account_management':
        return quickActionsMenuSettings.accountManagement
      default:
        return []
    }
  }

  // get Confirm Modal Data
  getConfirmModalData() {
    if (this.state.isShowNominatedChangedModalWindow) {
      return quickActionsConfirmModalSettings.nominatedChanged
    }
    if (this.state.isShowOrderChequeBooksRequestSubmittedModalWindow) {
      return quickActionsConfirmModalSettings.orderChequeBooksRequestSubmitted
    }
    if (this.state.isShowOrderGiroBooksRequestSubmittedModalWindow) {
      return quickActionsConfirmModalSettings.orderGiroBooksRequestSubmitted
    }
    if (this.state.isShowReactiveAccountRequestSubmittedModalWindow) {
      return quickActionsConfirmModalSettings.reactiveAccountRequestSubmitted
    }
  }

  clickActions(actionName: string) {
    switch (actionName) {
      case 'account_information':
        this.setState({
          isShowAccountInformationModalWindow: true,
        })
        break
      case 'request_closure':
        if (this.props.individualBusiness === 'business') {
          this.setState({
            isShowRequestClosureBusinessModalWindow: true,
          })
        } else {
          this.setState({
            isShowRequestClosureIndividualModalWindow: true,
            // isShowAccountClosureSuccessModalWindow: true,
          })
        }
        break
      case 'change_nominated':
        this.setState({
          isShowChangeNominatedModalWindow: true,
        })
        break
      case 'order_cheque_books':
        this.setState({
          isShowOrderChequeBooksRequestModalWindow: true,
        })
        break
      case 'order_giro_books':
        this.setState({
          isShowOrderGiroBooksRequestModalWindow: true,
        })
        break
      case 'reactive_account':
        this.setState({
          isShowReactiveAccountRequestModalWindow: true,
        })
        break
      default:
        break
    }
  }

  goto(url: string) {
    this.props.history.push(url)
  }

  render() {
    const { t, fromAccountList } = this.props
    const {
      isEditMode,
      individualBusiness,
      accountName,
      accountNumber,
      deliveryAddress,
      dataList,
      shownLoan,
      shownClosed,
    } = { ...this.props }
    const {
      isOpend,
      shownSubTab,
      closureData,
      accountClosureData,
      isShowNominatedChangedModalWindow,
      isShowOrderChequeBooksRequestModalWindow,
      isShowOrderChequeBooksRequestSubmittedModalWindow,
      isShowOrderGiroBooksRequestModalWindow,
      isShowOrderGiroBooksRequestSubmittedModalWindow,
      isShowReactiveAccountRequestModalWindow,
      isShowReactiveAccountRequestSubmittedModalWindow,
      isShowAccountInformationModalWindow,
      isShowRequestClosureBusinessModalWindow,
      isShowRequestClosureComposeEmailModalWindow,
      isShowRequestClosureSubmittedModalWindow,
      isShowChangeNominatedModalWindow,
      isShowRequestErrorModalWindow,
      isShowRequestClosureIndividualModalWindow,
      isShowAccountClosureSuccessModalWindow,
    } = { ...this.state }

    return (
      <div className={`white-panel ${isOpend ? 'open' : ''}`}>
        {(isShowNominatedChangedModalWindow ||
          isShowOrderChequeBooksRequestSubmittedModalWindow ||
          isShowOrderGiroBooksRequestSubmittedModalWindow ||
          isShowReactiveAccountRequestSubmittedModalWindow) && (
          <GeneralConfirmModalWindow
            titleText={t('accountsDashboard.quickActions.' + this.getConfirmModalData()?.title)}
            messageText={`${t(
              'accountsDashboard.quickActions.' + this.getConfirmModalData()?.content
            )}`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({
                isShowNominatedChangedModalWindow: false,
                isShowOrderChequeBooksRequestSubmittedModalWindow: false,
                isShowOrderGiroBooksRequestSubmittedModalWindow: false,
                isShowReactiveAccountRequestSubmittedModalWindow: false,
              })
            }}
          />
        )}

        {isShowAccountInformationModalWindow && (
          <AccountInformationModalWindow
            dataList={dataList}
            onClose={() => {
              this.setState({
                isShowAccountInformationModalWindow: false,
              })
            }}
          />
        )}

        {isShowRequestClosureSubmittedModalWindow && (
          <RequestClosureSubmittedModalWindow
            accountName={accountName}
            accountNumber={accountNumber}
            onClose={() => {
              this.setState({
                isShowRequestClosureSubmittedModalWindow: false,
              })
            }}
          />
        )}

        {(isShowOrderChequeBooksRequestModalWindow || isShowOrderGiroBooksRequestModalWindow) && (
          <OrderGiroChequeBooksModalWindow
            title={
              isShowOrderChequeBooksRequestModalWindow ? 'order_cheque_books' : 'order_giro_books'
            }
            deliveryAddress={deliveryAddress}
            onSubmit={() => {
              isShowOrderChequeBooksRequestModalWindow
                ? this.setState({
                    isShowOrderChequeBooksRequestSubmittedModalWindow: true,
                  })
                : this.setState({
                    isShowOrderGiroBooksRequestSubmittedModalWindow: true,
                  })
              this.setState({
                isShowOrderChequeBooksRequestModalWindow: false,
                isShowOrderGiroBooksRequestModalWindow: false,
              })
            }}
            onClose={() => {
              this.setState({
                isShowOrderChequeBooksRequestModalWindow: false,
                isShowOrderGiroBooksRequestModalWindow: false,
              })
            }}
          />
        )}

        {isShowChangeNominatedModalWindow && (
          <ChangeNominatedModalWindow
            onSave={() => {
              this.setState({
                isShowChangeNominatedModalWindow: false,
              })
              if (Math.round(Math.random() * 2) >= 1) {
                this.setState({
                  isShowNominatedChangedModalWindow: true,
                })
              } else {
                this.setState({
                  isShowRequestErrorModalWindow: true,
                })
              }
            }}
            onClose={() => {
              this.setState({
                isShowChangeNominatedModalWindow: false,
              })
            }}
          />
        )}

        {isShowRequestErrorModalWindow && (
          <RequestErrorModalWindow
            onCustomerService={() => {
              this.setState({
                isShowRequestErrorModalWindow: false,
              })
            }}
            onClose={() => {
              this.setState({
                isShowRequestErrorModalWindow: false,
              })
            }}
          />
        )}

        {isShowReactiveAccountRequestModalWindow && (
          <ReactiveAccountModalWindow
            accountName={accountName}
            onSubmit={() => {
              this.setState({
                isShowReactiveAccountRequestSubmittedModalWindow: true,
                isShowReactiveAccountRequestModalWindow: false,
              })
            }}
            onClose={() => {
              this.setState({
                isShowReactiveAccountRequestModalWindow: false,
              })
            }}
          />
        )}

        {isShowRequestClosureBusinessModalWindow && (
          <RequestClosureBusinessModalWindow
            onSubmit={() => {
              this.setState({
                isShowRequestClosureComposeEmailModalWindow: true,
                isShowRequestClosureBusinessModalWindow: false,
              })
            }}
            onClose={() => {
              this.setState({
                isShowRequestClosureBusinessModalWindow: false,
              })
            }}
          />
        )}

        {isShowRequestClosureComposeEmailModalWindow && (
          <ComposeEmailModal
            dataAdditional={closureData}
            onClose={(event: boolean) => {
              if (event) {
                this.setState({
                  isShowRequestClosureSubmittedModalWindow: true,
                  isShowRequestClosureComposeEmailModalWindow: false,
                })
              } else {
                this.setState({
                  isShowRequestClosureComposeEmailModalWindow: false,
                })
              }
            }}
          />
        )}

        {isShowRequestClosureIndividualModalWindow && (
          <RequestClosureIndividualModalWindow
            fromAccountList={fromAccountList}
            onClose={() => {
              this.setState({
                isShowRequestClosureIndividualModalWindow: false,
              })
            }}
            onConfirm={(event: RequestClosureIndividualData) => {
              this.setState({
                accountClosureData: event,
                isShowRequestClosureIndividualModalWindow: false,
                isShowAccountClosureSuccessModalWindow: true,
              })
            }}
          />
        )}

        {isShowAccountClosureSuccessModalWindow && (
          <AccountClosureSuccessModalWindow
            data={accountClosureData}
            onConfirm={() =>
              this.setState({
                isShowAccountClosureSuccessModalWindow: false,
              })
            }
            onClose={() =>
              this.setState({
                isShowAccountClosureSuccessModalWindow: false,
              })
            }
          />
        )}

        {!shownLoan && !shownClosed && (
          <React.Fragment>
            {shownSubTab === '' && (
              <div className="account-menu">
                <div className="title-bar flex-grid">
                  <div className="blue-title">
                    {isEditMode && <i className="icons icon-four-arrow" />}
                    {t('accountsDashboard.quickActions.account_menu')}
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
                  <div className="quick-actions">
                    {quickActionsMenuSettings.mainMenu &&
                      quickActionsMenuSettings.mainMenu.map((item, index) => (
                        <a
                          key={index}
                          href="#javascript"
                          className="row-line"
                          onClick={(event) => {
                            this.clickMenu(item.optionLabel)
                            event.preventDefault()
                          }}
                        >
                          <div className="lefts">
                            <i className={`icons ${item.iconName}`} />
                            <div className="txt-area">
                              <div className="green-txt">
                                {t('accountsDashboard.quickActions.' + item.optionLabel)}
                              </div>
                              <div className="gray-txt">
                                {t('accountsDashboard.quickActions.' + item.descriptionLabel)}
                              </div>
                            </div>
                          </div>
                          <span className="icons right-icons" />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {shownSubTab !== '' && (
              <div className="account-management payment-transfer-management">
                <div className="title-bar flex-grid">
                  <div className="blue-title">
                    {t('accountsDashboard.quickActions.' + shownSubTab)}
                  </div>
                  <div className="rights">
                    <a
                      href="#javascript"
                      className="icons btn-close label-transparent"
                      onClick={(event) => {
                        this.clickMenu('')
                        event.preventDefault()
                      }}
                    >
                      {t('common.btns.close')}
                    </a>
                  </div>
                </div>
                {this.getOptionData(shownSubTab) &&
                  this.getOptionData(shownSubTab).map((item, index) => (
                    <div key={index}>
                      {item.groupTitle !== '' && (
                        <div className="gray-bar">
                          {t('accountsDashboard.quickActions.' + item.groupTitle)}
                        </div>
                      )}
                      <div className="icon-list">
                        {item.optionList &&
                          item.optionList.map((optionItem, optionIndex) => (
                            <a
                              href="#javascript"
                              className={`row-line ${
                                individualBusiness === 'business' ||
                                (individualBusiness === 'individual' &&
                                  optionItem?.individualBusiness !== 'business')
                                  ? ''
                                  : 'hide'
                              }`}
                              key={optionIndex}
                              onClick={(event) => {
                                if (optionItem.pageUrl === '') {
                                  this.clickActions(optionItem.optionLabel)
                                } else {
                                  this.goto(optionItem.pageUrl)
                                }
                                event.preventDefault()
                              }}
                            >
                              <div className="left-img">
                                <img src={optionItem.iconUrl} alt="svg" />
                              </div>
                              <div className="green-txt">
                                {t('accountsDashboard.quickActions.' + optionItem.optionLabel)}
                              </div>
                            </a>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </React.Fragment>
        )}

        {(shownLoan || shownClosed) && (
          <div className="account-management more-option">
            <div className="title-bar flex-grid">
              <div className="blue-title">
                {isEditMode && <i className="icons icon-four-arrow" />}
                {t('accountsDashboard.quickActions.account_menu')}
              </div>
            </div>
            <div className="icon-list">
              <React.Fragment>
                {(shownClosed ? quickActionsMenuSettings.accountMenuClosed : []) &&
                  (shownClosed ? quickActionsMenuSettings.accountMenuClosed : []).map(
                    (item, index) => (
                      <div key={index}>
                        {item.groupTitle !== '' && (
                          <div className="gray-bar">
                            {t('accountsDashboard.quickActions.' + item.groupTitle)}
                          </div>
                        )}
                        <div className="icon-list">
                          {item.optionList &&
                            item.optionList.map((optionItem, optionIndex) => (
                              <a
                                href="#javascript"
                                className="row-line"
                                key={optionIndex}
                                onClick={(event) => {
                                  this.clickActions(optionItem.optionLabel)
                                  event.preventDefault()
                                }}
                              >
                                <div className="left-img">
                                  <img src={optionItem.iconUrl} alt="svg" />
                                </div>
                                <div className="green-txt">
                                  {t('accountsDashboard.quickActions.' + optionItem.optionLabel)}
                                </div>
                              </a>
                            ))}
                        </div>
                      </div>
                    )
                  )}
              </React.Fragment>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default compose<any>(withTranslation(), withRouter)(QuickActions)
