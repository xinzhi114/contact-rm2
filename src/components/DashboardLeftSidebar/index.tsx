import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import DashboardHeader from '../DashboardHeader'
import { LogoutButton } from '../DashboardHeader/LogoutButton'
import './styles.scss'

export interface IDashboardLeftSidebarProps {
  headerWhiteBg?: boolean
  title?: string
  desktopShownIcon: string
  mobileShownIcon: string
  showDemoLink: boolean
  showEditMode?: boolean
  headerBreadcrumbData?: {
    pageName: string
    pageUrl: string
  }[]
  setIndividualBusiness?: any
  setIsEditMode?: any
}

export const DashboardLeftSidebar: React.FunctionComponent<IDashboardLeftSidebarProps> = (
  props
) => {
  const { t } = useTranslation()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [leftCollapsed, setLeftCollapsed] = useState<boolean>(
    localStorage.getItem('leftCollapsed') ? localStorage.getItem('leftCollapsed') === 'true' : false
  )
  const [individualBusiness, setIndividualBusiness] = useState<string>(
    localStorage.getItem('individualBusiness')
      ? (localStorage.getItem('individualBusiness') as string)
      : 'individual'
  )
  const [isEditMode, setIsEditMode] = useState<boolean>(
    localStorage.getItem('isEditMode') ? localStorage.getItem('isEditMode') === 'true' : false
  )

  // set Collapsed
  const setCollapsed = () => {
    const input = document.getElementById('root') as HTMLInputElement
    input.classList.add('close-left')
  }

  // change Individual Business
  const changeIndividualBusiness = (accountType: string) => {
    setIndividualBusiness(accountType)
    localStorage.setItem('individualBusiness', accountType)
    if (props.setIndividualBusiness) {
      props.setIndividualBusiness(accountType)
    }
  }

  // onClickMenu
  const onClickMenu = () => {
    setCollapsed()

    localStorage.setItem('leftCollapsed', (!leftCollapsed).toString())
    setLeftCollapsed(!leftCollapsed)
  }

  // on Click Mobile Menu
  const onClickMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  // on Click Profile
  const onClickProfile = () => {
    setShowMobileMenu(false)
    setShowProfile(!showProfile)
    setShowNotification(false)
    setShowHelp(false)
  }

  // on Click Notification
  const onClickNotification = () => {
    setShowMobileMenu(false)
    setShowProfile(false)
    setShowNotification(!showNotification)
    setShowHelp(false)
  }

  // on Click Help
  const onClickHelp = () => {
    setShowMobileMenu(false)
    setShowProfile(false)
    setShowNotification(false)
    setShowHelp(!showHelp)
  }

  // on Click Outside
  const onClickOutside = () => {
    setShowProfile(false)
    setShowNotification(false)
    setShowHelp(false)
  }

  const {
    headerWhiteBg,
    title,
    desktopShownIcon,
    mobileShownIcon,
    showDemoLink,
    showEditMode,
    headerBreadcrumbData,
    setIndividualBusiness: setIndividualBusinessProp,
    setIsEditMode: setIsEditModeProp,
  } = {
    ...props,
  }

  useEffect(() => {
    setCollapsed()
    if (setIndividualBusinessProp) {
      setIndividualBusinessProp(individualBusiness)
    }
    if (!!showEditMode) {
      setIsEditModeProp(isEditMode)
    }
    return () => {
      const input = document.getElementById('root') as HTMLInputElement
      input.classList.remove('close-left')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <DashboardHeader
        t={t}
        headerWhiteBg={headerWhiteBg}
        title={title}
        desktopShownIcon={desktopShownIcon}
        mobileShownIcon={mobileShownIcon}
        showDemoLink={showDemoLink}
        showEditMode={showEditMode ? true : false}
        headerBreadcrumbData={headerBreadcrumbData}
        showProfile={showProfile}
        showNotification={showNotification}
        showHelp={showHelp}
        individualBusiness={individualBusiness}
        isEditMode={isEditMode}
        onClickMobileMenu={() => onClickMobileMenu()}
        onClickProfile={() => onClickProfile()}
        onClickNotification={() => onClickNotification()}
        onClickHelp={() => onClickHelp()}
        onClickOutside={() => onClickOutside()}
        setIndividualBusiness={(accountType: string) => {
          changeIndividualBusiness(accountType)
        }}
        setIsEditMode={(editMode: boolean) => {
          setIsEditMode(editMode)
          localStorage.setItem('isEditMode', editMode.toString())
          if (!!showEditMode) {
            props.setIsEditMode(editMode)
          }
        }}
      />
      <div className={`left-aside ${showMobileMenu ? '' : 'mobile-hide'} close-status`}>
        <div className="top-area">
          <div className="close-two">
            <div className="top-title flex mobile-hide">
              <a
                href="#javascript"
                className="icons icon-menu label-transparent hide"
                onClick={(event) => {
                  onClickMenu()
                  event.preventDefault()
                }}
              >
                {t('common.btns.icon_menu')}
              </a>
              <a
                href="#javascript"
                className="right-area"
                onClick={(event) => {
                  onClickMenu()
                  event.preventDefault()
                }}
              >
                <img src="/assets/logo-dummy.svg" alt="svg" />
              </a>
            </div>
            <div className="mobile-left-title desktop-hide mobile-show">
              <a
                href="#javascript"
                className="btn-close label-transparent"
                onClick={(event) => {
                  onClickMobileMenu()
                  event.preventDefault()
                }}
              >
                {t('common.btns.close')}
              </a>
              <span className="blue-title">{t('common.labels.odyssey-mobile-banking')}</span>
            </div>
            <a
              href="#javascript"
              className="icons icon-logo label-transparent"
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              {t('common.btns.icon_logo')}
            </a>
          </div>
          <ul className="left-navs">
            <li>
              <NavLink to="/customerDashboard" exact={true} className="icon-list">
                <i className="icons icon-home" />
                <span className="txt">{t('common.labels.home')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/accountsDashboard" exact={false} className="icon-list">
                <i className="icons icon-account" />
                <span className="txt">{t('common.labels.accounts')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/movePaymentPages" className="icon-list">
                <i className="icons icon-manage" />
                <span className="txt">{t('common.labels.move_money')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/eStatements" exact={true} className="icon-list">
                <i className="icons icon-book" />
                <span className="txt">{t('common.labels.eStatements')}</span>
              </NavLink>
            </li>
            {individualBusiness === 'individual' && (
              <li>
                <NavLink to="/financeManager" exact={true} className="icon-list">
                  <i className="icons icon-finance" />
                  <span className="txt">{t('common.labels.finance_manager')}</span>
                </NavLink>
              </li>
            )}
            <li className="mobile-show desktop-hide">
              <a
                href="#javascript"
                className="icon-list"
                onClick={(event) => {
                  onClickProfile()
                  event.preventDefault()
                }}
              >
                <i className="icons icon-profile" />
                <span className="txt">{t('common.labels.my_profile')}</span>
              </a>
            </li>
            <li className="mobile-hide">
              <NavLink to="/helpSupport/0" className="icon-list">
                <i className="icons icon-support" />
                <span className="txt">{t('common.labels.help_support')}</span>
              </NavLink>
            </li>
            <li className="mobile-show desktop-hide">
              <a
                href="#javascript"
                className="icon-list"
                onClick={(event) => {
                  onClickHelp()
                  event.preventDefault()
                }}
              >
                <i className="icons icon-support" />
                <span className="txt">{t('common.labels.help_support')}</span>
              </a>
            </li>
            <li className="desktop-hide">
              <a
                href="#javascript"
                className="icon-list"
                onClick={(event) => event.preventDefault()}
              >
                <i className="icons icon-contact-us" />
                <span className="txt">{t('common.labels.contact_us')}</span>
              </a>
            </li>
            <li className="desktop-hide mobile-hide">
              <NavLink to="/" exact className="icon-list">
                <i className="icons icon-logout" />
                <span className="txt">{t('common.labels.logout')}</span>
              </NavLink>
            </li>
          </ul>
          <div className="two-btns hide">
            <a
              href="#javascript"
              className={`icons icon-user label-transparent ${
                individualBusiness === 'individual' ? 'current' : ''
              }`}
              onClick={() => {
                changeIndividualBusiness('individual')
              }}
            >
              {t('common.btns.icon_user')}
            </a>
            <a
              href="#javascript"
              className={`icons icon-build label-transparent ${
                individualBusiness === 'business' ? 'current' : ''
              }`}
              onClick={() => {
                changeIndividualBusiness('business')
              }}
            >
              {t('common.btns.icon_build')}
            </a>
          </div>
        </div>
        <div className="bottom-area desktop-hide mobile-show">
          <LogoutButton showLabel />
        </div>
        <div className="bottom-area mobile-hide">
          <div className="img-wrap">
            <div className="white-txt">{t('common.labels.apply_for_your_pre_approved')}</div>
            <div className="green-txt">£1M {t('common.labels.loan')}</div>
            <div className="blue-btn">{t('common.labels.apply_now')}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DashboardLeftSidebar
