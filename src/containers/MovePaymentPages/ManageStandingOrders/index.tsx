import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import LeftFilters from '../../../components/MovePaymentComponents/ManageStandingOrdersComponents/LeftFilters'
import RightTable from '../../../components/MovePaymentComponents/ManageStandingOrdersComponents/RightTable'
import CreateForm from '../../../components/MovePaymentComponents/ManageStandingOrdersComponents/CreateForm'
import CreateInfo from '../../../components/MovePaymentComponents/ManageStandingOrdersComponents/CreateInfo'
import ReviewAndSubmitForm from '../../../components/MovePaymentComponents/ManageStandingOrdersComponents/ReviewAndSubmitForm'
import GeneralConfirmModalWindow from '../../../components/GeneralConfirmModalWindow'
import ActivityDetection from '../../../components/ActivityDetection'
import { StandingOrder } from '../../../domain/StandingOrder'
import { useTranslation } from 'react-i18next'
import '../ApproveTransactions/styles.scss'

interface IManageStandingOrdersProps {
  movePaymentManageStandingOrders: {
    dataList?: {
      selectAccountData: {
        title: string
        subTitle: string
      }[]
      fromAccountList: {
        label: string
        value: string
        number: string
        availableBalance: string
      }[]
      tableData: StandingOrder[]
    }
  }
  dataAction?: any
}

const newOrderData = {
  orderDetails: {
    fromAccount: '',
    regularAmount: '',
    finalAmount: '',
    sortCode: '',
    accountNumber: '',
  },
  fieldList: [
    {
      fieldType: 'strongLabel',
      fieldName: 'bank_reference',
      fieldValue: '',
      queryHide: false,
    },
    {
      fieldType: 'label',
      fieldName: 'your_reference',
      fieldValue: '',
      queryHide: false,
    },
    {
      fieldType: 'label-frequency',
      fieldName: 'frequency',
      fieldValue: 'Monthly',
      queryHide: true,
    },
    {
      fieldType: 'label',
      fieldName: 'next_payment',
      fieldValue: new Date().toString(),
      queryHide: true,
    },
    {
      fieldType: 'label',
      fieldName: 'final_payment',
      fieldValue: new Date().toString(),
      queryHide: true,
    },
    {
      fieldType: 'strongLabel',
      fieldName: 'amount',
      fieldValue: '',
      queryHide: false,
    },
    {
      fieldType: 'action-edit-cancel',
      fieldName: 'action',
      fieldValue: '',
      queryHide: false,
    },
  ],
  expandData: null,
}

const ManageStandingOrders: React.FunctionComponent<IManageStandingOrdersProps> = (props) => {
  const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')
  const [isShowCreatedConfirmModalWindow, setIsShowCreatedConfirmModalWindow] = useState(false)
  const [createdOrderId] = useState('25698700')
  const [createdStandingOrder, setCreatedStandingOrderd] = useState(newOrderData)

  const [displayMode, setDisplayMode] = useState('table') // 'table', 'create', 'create-review'

  const [headerBreadcrumbData] = useState([
    {
      pageName: 'home',
      pageUrl: '/customerDashboard',
    },
    {
      pageName: 'payment_and_transfer',
      pageUrl: '/movePaymentPages',
    },
    {
      pageName: 'manage_standing_orders',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    const input = document.body as HTMLInputElement
    input.classList.add('bg-gray')
    return () => {
      // Anything in here is fired on component unmount.
      input.classList.remove('bg-gray')
    }
  }, [])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getMovePaymentManageStandingOrdersData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // click Create
  const clickCreate = () => {
    setCreatedStandingOrderd(newOrderData)
    setDisplayMode('create')
  }

  // click Cancel Create
  const clickCancelCreate = () => {
    setDisplayMode('table')
  }

  // click Submit Create
  const clickSubmitCreate = (orderData: any) => {
    setDisplayMode('create-review')

    setCreatedStandingOrderd(orderData)
  }

  // click Submit Review
  const clickSubmitReview = () => {
    setDisplayMode('table')
    setIsShowCreatedConfirmModalWindow(true)
  }

  const { dataList } = { ...props.movePaymentManageStandingOrders }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Payment and Transfer"
        desktopShownIcon=""
        mobileShownIcon="Back"
        showDemoLink={false}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {isShowCreatedConfirmModalWindow && (
        <GeneralConfirmModalWindow
          titleText={t('movePaymentManageStandingOrders.new_standing_order')}
          messageText={`${t(
            'movePaymentManageStandingOrders.standing_order'
          )} <strong>#${createdOrderId}</strong> ${t(
            'movePaymentManageStandingOrders.scheduled_successfully'
          )}`}
          confirmBtnText={t('common.btns.confirm')}
          onClose={() => {
            setIsShowCreatedConfirmModalWindow(false)
          }}
        />
      )}

      {!!dataList && (
        <div className="content manage-standing-orders-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              {displayMode === 'table' && (
                <div className="two-row ">
                  <LeftFilters
                    selectAccountData={dataList.selectAccountData}
                    applyFilter={() => null}
                  />

                  <div className={`right-container`}>
                    <RightTable
                      individualBusiness={individualBusiness}
                      dataList={dataList.tableData}
                      clickCreate={() => clickCreate()}
                    />
                  </div>
                </div>
              )}

              {displayMode === 'create' && (
                <div className="two-row ">
                  <CreateForm
                    individualBusiness={individualBusiness}
                    dataList={createdStandingOrder}
                    fromAccountList={dataList.fromAccountList}
                    clickCancelCreate={() => clickCancelCreate()}
                    clickSubmitCreate={(orderData: StandingOrder) => clickSubmitCreate(orderData)}
                  />

                  <CreateInfo />
                </div>
              )}

              {displayMode === 'create-review' && (
                <div className="two-row ">
                  <ReviewAndSubmitForm
                    individualBusiness={individualBusiness}
                    dataList={createdStandingOrder}
                    clickSubmitReview={() => clickSubmitReview()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(ManageStandingOrders)
