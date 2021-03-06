import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import FormBox from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/FormBox'
import ReviewAndSubmit from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/ReviewAndSubmit'
import { ProgressStepper } from '../../../components/MovePaymentComponents/ProgressStepper'
import DeleteTransferModalWindow from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/DeleteTransferModalWindow'
import UpdateTransferModalWindow from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/UpdateTransferModalWindow'
import SuccessTransferModalWindow from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/SuccessTransferModalWindow'
import SetupRecurringTransferModalWindow from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/SetupRecurringTransferModalWindow'
import SuccessRecurringTransferModalWindow from '../../../components/MovePaymentComponents/TransferBetweenAccountsComponents/SuccessRecurringTransferModalWindow'
import ActivityDetection from '../../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import './styles.scss'
import { movePaymentTransferBetweenAccountsProgressSteps } from '../../../config'

export interface ITransferBetweenAccountsProps {
  t: any
  transferBetweenAccounts?: any
  transferBetweenAccountsSelectData?: any
  movePaymentTransferBetweenAccounts: {
    dataList?: {
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
  }
  dataAction?: any
}

interface ITransferBetweenAccountsState {
  currentStepIndex: number
  individualBusiness: string
  isShowReviewAndSubmit: boolean
  isShowUpdateDataModalWindow: boolean
  isShowDeleteModalWindow: boolean
  isShowMakeTransferModalWindow: boolean
  isShowSetupRecurringTransferModalWindow: boolean
  isShowSuccessRecurringTransferModalWindow: boolean
  headerBreadcrumbData: {
    pageName: string
    pageUrl: string
  }[]
}

export class TransferBetweenAccounts extends Component<
  ITransferBetweenAccountsProps,
  ITransferBetweenAccountsState
> {
  constructor(props: any) {
    super(props)

    nprogress.configure({ parent: 'main' })
    nprogress.start()
    this.state = {
      currentStepIndex: 0,
      individualBusiness: 'individual',
      isShowReviewAndSubmit: false,
      isShowUpdateDataModalWindow: false,
      isShowDeleteModalWindow: false,
      isShowMakeTransferModalWindow: false,
      isShowSetupRecurringTransferModalWindow: false,
      isShowSuccessRecurringTransferModalWindow: false,
      headerBreadcrumbData: [
        {
          pageName: 'home',
          pageUrl: '/customerDashboard',
        },
        {
          pageName: 'payment_and_transfer',
          pageUrl: '/movePaymentPages',
        },
        {
          pageName: 'transfer_between_accounts',
          pageUrl: '#',
        },
      ],
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.saveTransferBetweenAccounts(undefined)
    this.props.dataAction.getMovePaymentTransferBetweenAccountsData()
    nprogress.done()
  }

  componentWillUnmount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.remove('dashboard')
    nprogress.done()
    // fix Warning: Can't perform a React state update on an unmounted component
    /* istanbul ignore next */
    this.setState = () => {
      // return
    }
  }

  changeIndividualBusiness(accountType: string) {
    if (accountType === 'individual' || accountType === 'business') {
      this.setState({
        individualBusiness: accountType,
      })
    }
  }

  // get Current Step Index
  getCurrentStepIndex() {
    let currentStepIndex = this.state.currentStepIndex

    if (this.state.isShowReviewAndSubmit) {
      currentStepIndex = 4
    }

    return currentStepIndex
  }

  // set Current Step Index
  setCurrentStepIndex(index: number) {
    this.setState({
      currentStepIndex: index,
    })
  }

  render() {
    const { t } = this.props
    const { transferBetweenAccounts, movePaymentTransferBetweenAccounts } = { ...this.props }
    const {
      individualBusiness,
      isShowReviewAndSubmit,
      isShowUpdateDataModalWindow,
      isShowDeleteModalWindow,
      isShowMakeTransferModalWindow,
      isShowSetupRecurringTransferModalWindow,
      isShowSuccessRecurringTransferModalWindow,
      headerBreadcrumbData,
    } = { ...this.state }
    const { dataList } = movePaymentTransferBetweenAccounts || {}

    return (
      <React.Fragment>
        <DashboardLeftSidebar
          headerWhiteBg={true}
          title="Payment and Transfer"
          desktopShownIcon=""
          mobileShownIcon="Back"
          showDemoLink={false}
          headerBreadcrumbData={headerBreadcrumbData}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        {isShowUpdateDataModalWindow && (
          <UpdateTransferModalWindow
            individualBusiness={individualBusiness}
            selectData={dataList}
            data={transferBetweenAccounts}
            onClose={() => this.setState({ isShowUpdateDataModalWindow: false })}
          />
        )}

        {isShowDeleteModalWindow && (
          <DeleteTransferModalWindow
            individualBusiness={individualBusiness}
            data={transferBetweenAccounts}
            onClose={() => this.setState({ isShowDeleteModalWindow: false })}
          />
        )}

        {isShowMakeTransferModalWindow && (
          <SuccessTransferModalWindow
            individualBusiness={individualBusiness}
            data={transferBetweenAccounts}
            onClose={() => this.setState({ isShowMakeTransferModalWindow: false })}
            onSetupRecurringTransfer={() =>
              this.setState({
                isShowMakeTransferModalWindow: false,
                isShowSetupRecurringTransferModalWindow: true,
              })
            }
          />
        )}

        {isShowSetupRecurringTransferModalWindow && (
          <SetupRecurringTransferModalWindow
            data={transferBetweenAccounts}
            onClose={() => this.setState({ isShowSetupRecurringTransferModalWindow: false })}
            onSave={() =>
              this.setState({
                isShowSetupRecurringTransferModalWindow: false,
                isShowSuccessRecurringTransferModalWindow: true,
              })
            }
          />
        )}

        {isShowSuccessRecurringTransferModalWindow && (
          <SuccessRecurringTransferModalWindow
            messageText={'Setup recurring transfer has been created successfully.'}
            onClose={() => this.setState({ isShowSuccessRecurringTransferModalWindow: false })}
          />
        )}

        {!!dataList && (
          <div className="content transfer-between-accounts-content">
            <div className="mains">
              <ActivityDetection />

              <div className="three-row">
                <div className="two-row ">
                  <div
                    className={`transfer-between-accounts-form-box ${
                      isShowReviewAndSubmit ? 'hide' : ''
                    }`}
                  >
                    <FormBox
                      t={t}
                      individualBusiness={individualBusiness}
                      dataList={dataList}
                      clickSaveAndPreview={() => this.setState({ isShowReviewAndSubmit: true })}
                      changeCurrentStepIndex={(index: number) =>
                        this.setState({ currentStepIndex: index })
                      }
                    />
                  </div>

                  {isShowReviewAndSubmit && (
                    <ReviewAndSubmit
                      individualBusiness={individualBusiness}
                      data={transferBetweenAccounts}
                      clickBack={() => this.setState({ isShowReviewAndSubmit: false })}
                      clickUpdateData={() => this.setState({ isShowUpdateDataModalWindow: true })}
                      clickDelete={() => this.setState({ isShowDeleteModalWindow: true })}
                      clickMakeTransfer={() =>
                        this.setState({ isShowMakeTransferModalWindow: true })
                      }
                    />
                  )}

                  <div className={`right-container`}>
                    <ProgressStepper
                      currentIndex={this.getCurrentStepIndex()}
                      steps={movePaymentTransferBetweenAccountsProgressSteps}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(compose<any>(withTranslation())(TransferBetweenAccounts))
