import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import NormalTab from '../../components/NormalTab'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import EStatementsLeftFilter from '../../components/EStatementsComponents/EStatementsLeftFilter'
import ActivityDetection from '../../components/ActivityDetection'
// import { useTranslation } from 'react-i18next'
import './styles.scss'

interface IEStatementsProps {
  eStatements: {
    dataList?: {
      accountList: {
        accountType: string
        accountNumber: string
      }[]
      statementOfInterest: {
        description: string
        lastUpdated: string
      }
    }
  }
  dataAction?: any
}

const tabArray = [
  'Account statement',
  'Statement of interest for specific period',
  'Statement of Interest',
]
const EStatements: React.FunctionComponent<IEStatementsProps> = (props) => {
  // const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')
  const [currentTab, setCurrentTab] = useState('Account statement')

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getEStatementsData()
  }, [props.dataAction])

  useEffect(() => {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    return () => {
      // Anything in here is fired on component unmount.
      input.classList.remove('dashboard')
    }
  }, [])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // click Tab
  const clickTab = (tabName: string) => {
    setCurrentTab(tabName)
  }

  // click Download
  const clickDownload = () => {
    // click download
  }

  const { dataList } = { ...props.eStatements }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="EStatements"
        desktopShownIcon="EStatements"
        mobileShownIcon="Menu"
        showDemoLink={true}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {!!dataList && (
        <div className="content eStatements-content">
          <div className="mains some-cols eStatements-cols">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <NormalTab
                tabArray={tabArray}
                currentTab={currentTab}
                clickTab={(tabName: string) => clickTab(tabName)}
              />
              <div className="two-row">
                <EStatementsLeftFilter
                  tabName={currentTab}
                  dataList={dataList}
                  onApply={() => clickDownload()}
                />
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

export default connect(mapStateToProps, matchDispatchToProps)(EStatements)
