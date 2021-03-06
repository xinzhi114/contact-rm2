import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import CardLeftProfile from '../../components/AccountLoanComponents/CardLeftProfile'
import CardRightBox from '../../components/AccountLoanComponents/CardRightBox'
import * as _ from 'lodash'
import ActivityDetection from '../../components/ActivityDetection'
import { useTranslation } from 'react-i18next'
import './styles.scss'

interface CardList {
  bankName: string
  cardType: string
  fieldList: {
    label: string
    value: string
  }[]
  manageDebitCard: {
    type: string
    iconUrl: string
    title: string
    description: string
    rightGrayText: string
    actived: boolean
  }[]
}

interface IManageCardProps {
  manageCard: {
    dataList: {
      cardDetails: CardList[]
    }
  }
  dataAction?: any
}

const ManageCard: React.FunctionComponent<IManageCardProps> = (props) => {
  const { t } = useTranslation()

  const [individualBusiness, setIndividualBusiness] = useState('individual')
  const { currentIndex } = useParams()
  const [currentIndexValue, setCurrentIndexValue] = useState(parseInt(currentIndex, 10))

  const [cardDetails, setCardDetails] = useState([] as CardList[])

  const [headerBreadcrumbData] = useState([
    {
      pageName: 'home',
      pageUrl: '/customerDashboard',
    },
    {
      pageName: 'manage_debit_card',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getManageCardData()
  }, [props.dataAction])

  useEffect(() => {
    if (props.manageCard) {
      setCardDetails(props.manageCard.dataList.cardDetails)
    }
  }, [props.manageCard])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  // set Activate
  const setActivate = () => {
    const cardDetailsNew = cardDetails as any

    cardDetailsNew[currentIndexValue].fieldList[3].value = 'active'
    cardDetailsNew[currentIndexValue].manageDebitCard = [
      {
        type: 'lockDebitCard',
        iconUrl: '/assets/icon-lock-blue@2x.png',
        title: 'Lock debit card',
        description: 'Locked on 14 October 2020, 10:00 AM',
        rightGrayText: '',
        actived: false,
      },
      {
        type: 'blockDebitCard',
        iconUrl: '/assets/icon-block-debit@2x.png',
        title: 'Block debit card',
        description: 'Blocked on 15 October 2020, 09:03 AM',
        rightGrayText: '',
        actived: false,
      },
      {
        type: 'revealPINCVV',
        iconUrl: '/assets/reveal@2x.png',
        title: 'Reveal PIN/CVV',
        description: '',
        rightGrayText: 'PIN 787895 / CVV 022',
        actived: false,
      },
      {
        type: 'channelCanBeUsed',
        iconUrl: '/assets/channel@2x.png',
        title: 'Channel can be used',
        description: 'ATM',
        rightGrayText: '',
        actived: false,
      },
    ]

    setCardDetails(_.cloneDeep(cardDetailsNew))
  }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Manage Debit Card"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {cardDetails.length > 0 && (
        <div className="content manage-card-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="two-row">
                <CardLeftProfile
                  cardDisableColor="gray"
                  currentIndex={currentIndexValue}
                  dataList={cardDetails}
                  onClickPrevArrow={(index: number) => setCurrentIndexValue(index)}
                  onClickNextArrow={(index: number) => setCurrentIndexValue(index)}
                />

                <CardRightBox
                  t={t}
                  dataList={cardDetails[currentIndexValue].manageDebitCard}
                  setActivate={() => setActivate()}
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

export default connect(mapStateToProps, matchDispatchToProps)(ManageCard)
