import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import LeftFilters from '../../../components/MovePaymentComponents/ApproveTransactionsComponents/LeftFilters'
import RightTable from '../../../components/MovePaymentComponents/ApproveTransactionsComponents/RightTable'
import ActivityDetection from '../../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IApproveTransactionsProps {
  movePaymentApproveTransactions: {
    dataList?: {
      tableData: {
        checked: boolean
        transactionStatus: string
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

const ApproveTransactions: React.FunctionComponent<IApproveTransactionsProps> = (props) => {
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
      pageName: 'approve_transactions',
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
    props.dataAction.getMovePaymentApproveTransactionsData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  const { dataList } = { ...props.movePaymentApproveTransactions }

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
        <div className="content approve-transactions-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="two-row ">
                <LeftFilters applyFilter={() => null} />

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

export default connect(mapStateToProps, matchDispatchToProps)(ApproveTransactions)
