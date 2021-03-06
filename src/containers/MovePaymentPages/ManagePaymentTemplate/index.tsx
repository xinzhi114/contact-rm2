import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import LeftFilters from '../../../components/MovePaymentComponents/ManagePaymentTemplateComponents/LeftFilters'
import RightTable from '../../../components/MovePaymentComponents/ManagePaymentTemplateComponents/RightTable'
import ActivityDetection from '../../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import '../ApproveTransactions/styles.scss'

interface IManagePaymentTemplateProps {
  movePaymentManagePaymentTemplate: {
    dataList?: {
      selectAccountData: {
        title: string
        subTitle: string
      }[]
      helpAndSupportData: {
        title: string
        description: string
      }[]
      fromAccountList: {
        label: string
        value: string
        number: string
        availableBalance: string
      }[]
      tableData: {
        debitAccountId: string
        debitAccountAvailableBalance: string
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

const ManagePaymentTemplate: React.FunctionComponent<IManagePaymentTemplateProps> = (props) => {
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
      pageName: 'manage_payment_template',
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
    props.dataAction.getMovePaymentManagePaymentTemplateData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  const { dataList } = { ...props.movePaymentManagePaymentTemplate }

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
        <div className="content manage-payment-template-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="two-row ">
                <LeftFilters
                  selectAccountData={dataList.selectAccountData}
                  helpAndSupportData={dataList.helpAndSupportData}
                  applyFilter={() => null}
                />

                <div className={`right-container`}>
                  <RightTable
                    fromAccountList={dataList.fromAccountList}
                    dataList={dataList.tableData}
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

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(ManagePaymentTemplate)
