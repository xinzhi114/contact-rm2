import React, { Component, useEffect, useState } from 'react'
import './styles.scss'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import dataAction from '../../../../store/actions/dataAction'
import formValidationSvc from '../../../../services/formValidationSvc'
import { BaseTextInput } from '../../../../components/BaseForm/BaseFormFields/BaseTextInput'
import SelectComponent from '../SelectComponent'
import { BaseTextLinkButton } from '../../../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import ReactivateISACheckModalWindow from '../../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/ReactivateISACheckModalWindow'
import GeneralConfirmModalWindow from '../../../../components/GeneralConfirmModalWindow'
import { DATE_FORMAT } from '../../../../constants/date'

interface IFormBoxProps {
  t: any
  dataList: {
    helpAndSupport: {
      title: string
      description: string
    }[]
    fromAccountList: {
      label: string
      value: string
      number: string
      availableBalance: string
    }[]
    toAccountList: {
      label: string
      value: string
      number: string
      isActive: string
    }[]
  }
  individualBusiness: string
  clickSaveAndPreview?: any
  changeCurrentStepIndex?: any
  clickReactivateISA?: any
  dataAction?: any
}

interface IFormBoxState {
  dataList: {
    helpAndSupport: {
      title: string
      description: string
    }[]
    fromAccountList: {
      label: string
      value: string
      number: string
      availableBalance: string
    }[]
    toAccountList: {
      label: string
      value: string
      number: string
      isActive: string
    }[]
  }
  enabledSaveAndPreview: boolean
  showNoEligibleAccountsFound: boolean
  saveData: any
  fromAccountPrompt: any
  toAccountPrompt: any
  reactivateISAName: string
  isShowReactivateISACheckModalWindow: boolean
  isShowGeneralConfirmModalWindow: boolean
}

const Group = (props: any) => {
  const { t, individualBusiness, saveGroupData } = props
  const [transferAmount, setTransferAmount] = useState('')
  const [transferAmountPrevious, setTransferAmountPrevious] = useState('')

  const [fromAccountReference, setFromAccountReference] = useState('')
  const [fromAccountReferencePrevious, setFromAccountReferencePrevious] = useState('')
  const [transferDate, setTransferDate] = useState<Date | undefined>(new Date())

  const changeTransferAmount = (event: any, transferAmountValue: string) => {
    setTransferAmount(formValidationSvc.validateInputEnteringPattern(event, transferAmountValue))

    saveGroupData({
      key: 'transferAmount',
      value: transferAmountValue,
    })
  }
  const changeFromAccountReference = (event: any) => {
    setFromAccountReference(
      formValidationSvc.validateInputEnteringPattern(event, fromAccountReference)
    )

    saveGroupData({
      key: 'fromAccountReference',
      value: event.target.value,
    })
  }

  useEffect(() => {
    // changeCurrentStepIndex
    const changeCurrentStepIndex = () => {
      let index = 2

      if (transferAmount !== '' && fromAccountReference !== '') {
        index = 3
      }

      setTransferAmountPrevious(transferAmount)
      setFromAccountReferencePrevious(fromAccountReference)

      props.changeCurrentStepIndex(index)
    }

    if (
      transferAmount !== transferAmountPrevious ||
      fromAccountReference !== fromAccountReferencePrevious
    ) {
      changeCurrentStepIndex()
    }
  }, [
    transferAmount,
    transferAmountPrevious,
    fromAccountReference,
    fromAccountReferencePrevious,
    props,
  ])

  return (
    <div className="group">
      <div className="top-title flex-grid">
        {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.transfer')}
      </div>
      <div className="two-drop ">
        <div className="items">
          <div className="label-txt">
            {t('movePaymentTransferBetweenAccounts.reviewAndSubmit.transfer_amount')}
          </div>
          <div className="control-item">
            <BaseTextInput
              id="transferAmount"
              showCurrency
              pattern="[0-9]{1,12}([.])?[0-9]{0,2}"
              value={transferAmount}
              onChange={(event) => changeTransferAmount(event, transferAmount)}
            />
          </div>
        </div>
        <div className="items">
          <div className="label-txt">
            {individualBusiness === 'individual'
              ? t('movePaymentTransferBetweenAccounts.reviewAndSubmit.reference')
              : t('movePaymentTransferBetweenAccounts.reviewAndSubmit.from_account_reference')}
            {individualBusiness === 'individual' && (
              <a href="#javascript" className="icon icon-right-arrow label-transparent">
                {t('common.btns.icon_right_arrow')}
              </a>
            )}
            <div className="blue-block">
              To help you identify this transaction in your account statement
            </div>
          </div>
          <div className="control-item">
            <BaseTextInput
              id="fromAccountReference"
              pattern="[0-9a-zA-Z]{0,50}"
              value={fromAccountReference}
              onChange={(event) => changeFromAccountReference(event)}
            />
          </div>
        </div>
        <div className="items">
          <div className="label-txt">
            {t('movePaymentTransferBetweenAccounts.updateTransferModalWindow.transfer_date')}
          </div>
          <div className="control-item">
            <div className="global-date-container date-boxs">
              <div className="inputs disabled-style">
                <DatePicker
                  disabled
                  placeholderText={t(
                    'accountsDashboard.transactionLeftFilter.celendar_placeholder'
                  )}
                  dateFormat={DATE_FORMAT}
                  minDate={new Date()}
                  selected={transferDate}
                  onChange={(event: Date) => {
                    setTransferDate(event)
                    saveGroupData({
                      key: 'transferDate',
                      value: event,
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="items" />
      </div>
    </div>
  )
}

interface GroupData {
  transferDate?: Date
  transferAmount?: string
  fromAccountReference?: string
}

class FormBox extends Component<IFormBoxProps, IFormBoxState> {
  private groupData: GroupData = {
    transferDate: new Date(),
    transferAmount: '',
    fromAccountReference: '',
  }
  constructor(props: any) {
    super(props)

    this.state = {
      dataList: props.dataList,
      enabledSaveAndPreview: false,
      showNoEligibleAccountsFound: true,
      fromAccountPrompt: {
        isShow: false,
        value: '',
      },
      toAccountPrompt: {
        isShow: false,
      },
      saveData: {
        fromAccount: '',
        fromAccountNumber: '',
        toAccount: '',
        toAccountNumber: '',
        transferDate: undefined,
        transferAmount: '',
        fromAccountReference: '',
        id: '',
      },
      reactivateISAName: '',
      isShowReactivateISACheckModalWindow: false,
      isShowGeneralConfirmModalWindow: false,
    }
  }

  // revert Account To Active
  revertAccountToActive() {
    const dataList = this.state.dataList
    dataList.toAccountList.forEach((item) => {
      if (item.value === this.state.reactivateISAName) {
        item.isActive = ''
      }
    })

    this.setState({
      dataList,
      toAccountPrompt: {
        isShow: false,
      },
    })
  }

  // enabled Save and Preview
  enabledSaveAndPreview() {
    let pass = true

    if (
      !this.state.saveData.fromAccount ||
      !this.state.saveData.toAccount ||
      this.state.toAccountPrompt.isShow
    ) {
      pass = false
    }

    if (this.groupData.transferAmount === '') {
      pass = false
    }

    this.setState({ enabledSaveAndPreview: pass })
  }

  // click Clear
  clickClear() {
    this.setState({
      fromAccountPrompt: {
        isShow: false,
        value: '',
      },
      toAccountPrompt: {
        isShow: false,
      },
      saveData: {
        fromAccount: '',
        fromAccountNumber: '',
        toAccount: '',
        toAccountNumber: '',
        transferDate: undefined,
        transferAmount: '',
        fromAccountReference: '',
        id: '',
      },
    })

    this.groupData = {
      transferDate: new Date(),
      transferAmount: '',
      fromAccountReference: '',
    }

    this.setState({ enabledSaveAndPreview: false })
    this.props.changeCurrentStepIndex(0)
  }

  /**
   * save group data
   * @param data
   */
  saveGroupData(groupData: any) {
    // @ts-ignore
    this.groupData[groupData.key] = groupData.value
    this.enabledSaveAndPreview()
  }

  /**
   * save From data
   * @param data
   * @param accountPrompt
   */
  setFromData(data: any) {
    const { saveData, fromAccountPrompt } = this.state
    saveData[data.label] = data.value
    this.state.dataList.fromAccountList.forEach((item: any) => {
      if (item.value === data.value) {
        fromAccountPrompt.value = item.availableBalance

        saveData[data.label + 'Number'] = item.number
      }
    })

    fromAccountPrompt.isShow = true

    this.setState({
      ...this.state,
      fromAccountPrompt,
      showNoEligibleAccountsFound: false,
      saveData,
    })

    this.changeCurrentStepIndex()
  }

  /**
   * save Top data
   * @param data
   * @param accountPrompt
   */
  setToData(data: any) {
    const { saveData, toAccountPrompt } = this.state
    saveData[data.label] = data.value

    this.state.dataList.toAccountList.forEach((item: any) => {
      if (item.value === data.value) {
        toAccountPrompt.isShow = item.isActive === '' ? false : true
        saveData[data.label + 'Number'] = item.number
      }
    })

    this.setState({
      ...this.state,
      toAccountPrompt,
      saveData,
    })

    this.changeCurrentStepIndex()
  }

  changeCurrentStepIndex() {
    let index = 0
    const saveData = this.state.saveData

    if (saveData.fromAccount !== '' && saveData.toAccount === '') {
      index = 1
    }

    if (saveData.fromAccount !== '' && saveData.toAccount !== '') {
      if (!this.state.toAccountPrompt.isShow) {
        index = 2
      } else {
        index = 1
      }
    }

    this.props.changeCurrentStepIndex(index)
  }

  render() {
    const { t, individualBusiness } = this.props
    const {
      enabledSaveAndPreview,
      showNoEligibleAccountsFound,
      saveData,
      fromAccountPrompt,
      toAccountPrompt,
      reactivateISAName,
      isShowReactivateISACheckModalWindow,
      isShowGeneralConfirmModalWindow,
      dataList,
    } = this.state

    return (
      <div className="">
        {isShowReactivateISACheckModalWindow && (
          <ReactivateISACheckModalWindow
            onSubmit={() =>
              this.setState({
                isShowReactivateISACheckModalWindow: false,
                isShowGeneralConfirmModalWindow: true,
              })
            }
            onClose={() => this.setState({ isShowReactivateISACheckModalWindow: false })}
          />
        )}

        {isShowGeneralConfirmModalWindow && (
          <GeneralConfirmModalWindow
            titleText={t(
              'movePaymentTransferBetweenAccounts.reactivateISAModalWindow.reactivate_isa'
            )}
            messageText={`${t(
              'movePaymentTransferBetweenAccounts.reactivateISAModalWindow.your_online isa_account'
            )} \
                            '<strong>${reactivateISAName}</strong>'<br/> ${t(
              'movePaymentTransferBetweenAccounts.reactivateISAModalWindow.is_now_active'
            )}`}
            confirmBtnText={t('common.btns.confirm')}
            onClose={() => {
              this.setState({ isShowGeneralConfirmModalWindow: false })
              this.revertAccountToActive()
            }}
          />
        )}

        <div className="transfer-between-wrap">
          <div className="line-title">
            <i className="icons icon-trnasfer" />
            <span className="titles">
              {t('movePaymentTransferBetweenAccounts.formBox.transfer_between_accounts')}
            </span>
          </div>
          <div className="detail-group">
            <div className="group">
              <div className="top-title">
                {t('movePaymentTransferBetweenAccounts.formBox.account_details')}
              </div>
              <div className="two-drop">
                <div className="items">
                  <div className="label-txt">
                    {t('movePaymentTransferBetweenAccounts.formBox.from_account')}
                  </div>
                  <div className="control-item">
                    <SelectComponent
                      id="dropdown-basic-select-from"
                      t={t}
                      label="fromAccount"
                      data={dataList.fromAccountList}
                      defaultValue={saveData.fromAccount}
                      callBack={(event: any) => {
                        this.setFromData(event)
                      }}
                    />
                    {fromAccountPrompt.isShow ? (
                      <div className="bottom-txt flex-grid">
                        <div className="txt">
                          {t('movePaymentTransferBetweenAccounts.formBox.available_balance')}
                          <span className="bold-txt"> £ {fromAccountPrompt.value}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {saveData.fromAccount && (
                  <div className="items flex-end">
                    <div className="icons icon-arrow">&nbsp;</div>
                    <div className="right-inputs">
                      <div className="label-txt">
                        {t('movePaymentTransferBetweenAccounts.formBox.to_account')}
                      </div>
                      <div className="control-item">
                        <SelectComponent
                          id="dropdown-basic-select-to"
                          t={t}
                          label="toAccount"
                          data={dataList.toAccountList}
                          defaultValue={saveData.toAccount}
                          callBack={(event: any) => {
                            this.setToData(event)
                          }}
                        />
                        {toAccountPrompt.isShow ? (
                          <div className="bottom-txt flex-grid">
                            <div className="lefts">
                              <a
                                href="#javascript"
                                className="red-inactive"
                                onClick={(event) => event.preventDefault()}
                              >
                                {t(
                                  'movePaymentTransferBetweenAccounts.formBox.account_is_inactive'
                                )}
                              </a>
                            </div>
                            <div className="rights">
                              <BaseTextLinkButton
                                label={t(
                                  'movePaymentTransferBetweenAccounts.formBox.reactivate_ISA'
                                )}
                                href={'#javascript'}
                                onClick={() => {
                                  this.setState({
                                    reactivateISAName: saveData.toAccount,
                                    isShowReactivateISACheckModalWindow: true,
                                  })
                                }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {saveData.fromAccount && saveData.toAccount && !toAccountPrompt.isShow ? (
              <Group
                t={t}
                individualBusiness={individualBusiness}
                changeCurrentStepIndex={(index: number) => this.props.changeCurrentStepIndex(index)}
                saveGroupData={(groupData: any) => this.saveGroupData(groupData)}
              />
            ) : null}
          </div>
          {showNoEligibleAccountsFound && individualBusiness === 'individual' && (
            <div className="gray-bottom-block">
              <a
                href="#javascript"
                className="black-close label-transparent"
                onClick={() => this.setState({ showNoEligibleAccountsFound: false })}
              >
                {t('common.btns.close')}
              </a>
              <div className="titles">
                <i className="icons icon-info" />
                {t('movePaymentTransferBetweenAccounts.formBox.no_eligible_accounts_found')}.
              </div>
              <div className="p-txt">
                {t('movePaymentTransferBetweenAccounts.formBox.for_online_isa_and_online')}{' '}
                <BaseTextLinkButton
                  label={t('movePaymentTransferBetweenAccounts.formBox.my_accounts')}
                  href={'#javascript'}
                />{' '}
                {t('movePaymentTransferBetweenAccounts.formBox.or_to_your')}{' '}
                <BaseTextLinkButton
                  label={t(
                    'movePaymentTransferBetweenAccounts.formBox.savings_and_deposits_summary'
                  )}
                  href={'#javascript'}
                />
                , {t('movePaymentTransferBetweenAccounts.formBox.select_the_account_you_wish')}.
              </div>
              <div className="p-txt">
                {t('movePaymentTransferBetweenAccounts.formBox.for_more_information')}{' '}
                <BaseTextLinkButton
                  label={t('movePaymentTransferBetweenAccounts.formBox.faqs')}
                  href={'#javascript'}
                />
                .
              </div>
            </div>
          )}
          <div className="bottom-btn">
            <BaseTextLinkButton
              classNameContainer={enabledSaveAndPreview ? '' : 'disabled'}
              label={t('movePaymentTransferBetweenAccounts.formBox.save_and_continue')}
              href={'#javascript'}
              isButton={true}
              onClick={() => {
                const params: GroupData = {
                  ...this.state.saveData,
                  ...this.groupData,
                }
                this.props.dataAction.saveTransferBetweenAccounts(params)
                this.props.clickSaveAndPreview()
              }}
            />

            <a
              href="#javascript"
              className="green links"
              onClick={(event) => {
                this.clickClear()
                event.preventDefault()
              }}
            >
              {t('movePaymentTransferBetweenAccounts.formBox.clear')}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(FormBox)
