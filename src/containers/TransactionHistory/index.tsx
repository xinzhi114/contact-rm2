import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import { Col, Row } from 'react-bootstrap'
import { FlexContainer } from '../../components/FlexLayoutComponents/FlexContainer'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import TransactionHistoryLeftFilter from '../../components/AccountLoanComponents/TransactionHistoryLeftFilter'
import TransactionHistoryRight from '../../components/AccountLoanComponents/TransactionHistoryRight'
import ActivityDetection from '../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import './styles.scss'

interface ITransactionHistoryPageProps {
  transactionHistory: {
    dataList?: {
      creditTurnover: number
      debitTurnover: number
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

const TransactionHistoryPage: React.FunctionComponent<ITransactionHistoryPageProps> = (props) => {
  // const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')

  const [headerBreadcrumbData] = useState([
    {
      pageName: 'home',
      pageUrl: '/customerDashboard',
    },
    {
      pageName: 'accounts',
      pageUrl: '/accountsDashboard',
    },
    {
      pageName: 'transaction_history',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getTransactionHistoryData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // on Apply
  const onApply = () => {
    props.dataAction.getTransactionHistoryData()
  }

  // on Reset
  const onReset = () => {
    props.dataAction.getTransactionHistoryData()
  }

  const { dataList } = { ...props.transactionHistory }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Transaction History"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {!!dataList && (
        <div className="content transaction-history-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <FlexContainer flexDirection="column">
              <Row>
                <Col xs={12} lg={4} className="form-col">
                  <TransactionHistoryLeftFilter
                    onApply={() => onApply()}
                    onReset={() => onReset()}
                  />
                </Col>
                <Col xs={12} lg={8}>
                  <TransactionHistoryRight
                    creditTurnover={dataList.creditTurnover}
                    debitTurnover={dataList.debitTurnover}
                    dataList={dataList.tableData}
                  />
                </Col>
              </Row>
            </FlexContainer>
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

export default connect(mapStateToProps, matchDispatchToProps)(TransactionHistoryPage)
