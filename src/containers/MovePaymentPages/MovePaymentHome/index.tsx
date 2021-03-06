import React, { Component } from 'react'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import HomeMainBanner from '../../../components/MovePaymentComponents/HomeMainBanner'
import RelationshipManager from '../../../components/MovePaymentComponents/RelationshipManager'
import ActivityDetection from '../../../components/ActivityDetection'
import { withTranslation } from 'react-i18next'
import './styles.scss'

export interface IMovePaymentHomeProps {
  t: any
  movePayment: {
    dataList?: {
      approveTransactionsPending: number
      onlineTransactionStatusPending: number
      relationshipManager: {
        photoUrl: string
        stars: number
        name: string
        role: string
        state: string
        email: string
        phoneNumber: string
      }
    }
  }
  dataAction?: any
}

interface IMovePaymentHomeState {
  individualBusiness: string
}

export class MovePaymentHome extends Component<IMovePaymentHomeProps, IMovePaymentHomeState> {
  constructor(props: any) {
    super(props)

    nprogress.start()
    this.state = {
      individualBusiness: 'individual',
    }
  }

  componentDidMount() {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('dashboard')
    this.props.dataAction.getMovePaymentData()
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

  render() {
    const { dataList } = { ...this.props.movePayment }
    const { individualBusiness } = { ...this.state }

    return (
      <React.Fragment>
        <DashboardLeftSidebar
          headerWhiteBg={true}
          title="Move Money"
          desktopShownIcon=""
          mobileShownIcon="Menu"
          showDemoLink={false}
          setIndividualBusiness={(accountType: string) =>
            this.changeIndividualBusiness(accountType)
          }
        />

        <div className="content move-payment-content">
          <div className="mains">
            <ActivityDetection />

            <div className="three-row">
              {!!dataList && (
                <React.Fragment>
                  {individualBusiness === 'business' && (
                    <RelationshipManager data={dataList.relationshipManager} />
                  )}

                  <div className="two-row tab-alerts-account">
                    <HomeMainBanner dataList={dataList} individualBusiness={individualBusiness} />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
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
)(compose<any>(withTranslation())(MovePaymentHome))
