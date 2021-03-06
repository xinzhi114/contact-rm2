import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../../store/actions/dataAction'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import CardLeftProfile from '../../../components/AccountLoanComponents/CardLeftProfile'
import CardAccessRightBox from '../../../components/ManageAccessComponents/CardAccessRightBox'
import * as _ from 'lodash'
import ActivityDetection from '../../../components/ActivityDetection'
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

interface IUserListsProps {
  manageAccessUserLists: {
    dataList: {
      userAccessLevelData: {
        userNameColor: string
        userNameLabelColor: string
        userNameShortLabel: string
        fieldList: {
          fieldType: string
          fieldName: string
          fieldValue: string
          queryHide: boolean
        }[]
      }
      cardDetails: CardList[]
    }
  }
  dataAction?: any
}

const UserLists: React.FunctionComponent<IUserListsProps> = (props) => {
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
      pageName: 'manage_access',
      pageUrl: '/manageAccess/accessDashboard',
    },
    {
      pageName: 'user_lists',
      pageUrl: '#',
    },
  ])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getManageAccessUserListsData()
  }, [props.dataAction])

  useEffect(() => {
    if (props.manageAccessUserLists) {
      setCardDetails(props.manageAccessUserLists.dataList.cardDetails)
    }
  }, [props.manageAccessUserLists])

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
        title="Manage Access"
        desktopShownIcon="Back"
        mobileShownIcon="Back"
        showDemoLink={true}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {cardDetails.length > 0 && (
        <div className="content manage-access-user-lists-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <NavLink to="/manageAccess/accessDashboard" className="black-title">
              <span className="btn-back" />
              {t('manageAccess.back_to_manage_access')}
            </NavLink>

            <div className="three-row">
              <div className="two-row">
                <CardLeftProfile
                  cardDisableColor="darkGreen"
                  currentIndex={currentIndexValue}
                  dataList={cardDetails}
                  onClickPrevArrow={(index: number) => setCurrentIndexValue(index)}
                  onClickNextArrow={(index: number) => setCurrentIndexValue(index)}
                />

                <CardAccessRightBox
                  t={t}
                  userAccessLevelData={props.manageAccessUserLists.dataList.userAccessLevelData}
                  cardDetails={cardDetails[currentIndexValue]}
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

export default connect(mapStateToProps, matchDispatchToProps)(UserLists)
