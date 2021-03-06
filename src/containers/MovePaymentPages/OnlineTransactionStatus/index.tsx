import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import LeftFilters from '../../../components/MovePaymentComponents/OnlineTransactionStatusComponents/LeftFilters'
import RightTable from '../../../components/MovePaymentComponents/OnlineTransactionStatusComponents/RightTable'
import ActivityDetection from '../../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import '../ApproveTransactions/styles.scss'

interface IOnlineTransactionStatusProps {
  movePaymentOnlineTransactionStatus: {
    dataList?: {
      selectAccountData: {
        title: string
        subTitle: string
      }[]
      tableData: {
        fieldList: {
          fieldType: string
          fieldName: string
          fieldValue: string
          queryHide: boolean
        }[]
        expandData: {
          areaTitle: string
          fieldList: {
            fieldType: string
            fieldName: string
            fieldValue: string
          }[]
        }
      }[]
    }
  }
  dataAction?: any
}

const OnlineTransactionStatus: React.FunctionComponent<IOnlineTransactionStatusProps> = (props) => {
  // const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')

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
      pageName: 'online_transaction_status',
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
    props.dataAction.getMovePaymentOnlineTransactionStatusData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  const { dataList } = { ...props.movePaymentOnlineTransactionStatus }

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

      {!!dataList && (
        <div className="content online-transaction-status-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="two-row ">
                <LeftFilters
                  selectAccountData={dataList.selectAccountData}
                  applyFilter={() => null}
                />

                <div className={`right-container`}>
                  <RightTable dataList={dataList.tableData} />
                </div>
              </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(OnlineTransactionStatus)
