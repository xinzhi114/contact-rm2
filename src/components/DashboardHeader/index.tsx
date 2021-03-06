import React, { Component } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import dataAction from '../../store/actions/dataAction'
import { Dropdown } from 'react-bootstrap'
import TopBreadcrumb from '../TopBreadcrumb'
import { LoginHelpModalWindow } from '../LoginHelpModalWindow'
import OutsideClickHandler from 'react-outside-click-handler'
import { BaseTextLinkButton } from '../../components/BaseForm/BaseFormFields/BaseTextLinkButton'
import { LogoutButton } from './LogoutButton'
import './styles.scss'

export interface IDashboardHeaderProps extends RouteComponentProps<any> {
  t: any
  dashboardHeader?: {
    dataList?: {
      profile: {
        photoUrl: string
        username: string
        usernameShort: string
        usernameLabel: string
        accountType: string
      }
      lastLogin: string
      notifications: {
        alerts: {
          title: string
          content: string
          time: string
        }[]
        secureMessages: {
          title: string
          content: string
          time: string
        }[]
        pendingApprovals: {
          title: string
          content: string
          time: string
          approved: boolean
        }[]
      }
    }
  }
  dataAction?: any
  onClickMobileMenu?: any
  onClickProfile?: any
  onClickNotification?: any
  onClickHelp?: any
  onClickOutside?: any
  showProfile: boolean
  showNotification: boolean
  showHelp: boolean
  headerWhiteBg?: boolean
  title?: string
  desktopShownIcon: string
  mobileShownIcon: string
  individualBusiness: string
  setIndividualBusiness?: any
  isEditMode: boolean
  showDemoLink: boolean
  showEditMode: boolean
  headerBreadcrumbData?: {
    pageName: string
    pageUrl: string
  }[]
  setIsEditMode?: any
  history: any
}

interface IDashboardHeaderState {
  showLoginHelp: boolean
  showEditModeDemo: boolean
  filterTypeNotify: string
  pendingApprovals: {
    title: string
    content: string
    time: string
    approved: boolean
  }[]
}

const accountTypeDropdownOptions = ['individual', 'business']
export class DashboardHeader extends Component<IDashboardHeaderProps, IDashboardHeaderState> {
  constructor(props: any) {
    super(props)

    this.state = {
      showLoginHelp: false,
      showEditModeDemo: false,
      filterTypeNotify: 'Alerts',
      pendingApprovals: this.props.dashboardHeader?.dataList?.notifications?.pendingApprovals || [],
    }
  }

  componentDidMount() {
    this.props.dataAction.getDashboardHeaderData()
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.dashboardHeader !== prevProps.dashboardHeader) {
      if (this.props.dashboardHeader !== undefined) {
        this.setState({
          pendingApprovals:
            this.props.dashboardHeader?.dataList?.notifications.pendingApprovals || [],
        })
      }
    }
  }

  // go Back
  goBack() {
    this.props.history.goBack()
  }

  // click Bndividual Business toggle
  clickIndividualBusinessToggle(value: string) {
    this.props.setIndividualBusiness(value)
  }

  // on change dropdown
  onAccountTypeChangeDropdown = (accountType: string | null) => {
    this.props.setIndividualBusiness(accountType)
  }

  // click Login Help
  clickLoginHelp() {
    this.setState({
      showLoginHelp: true,
    })
  }

  // click Edit Mode Demo
  clickEditModeDemo() {
    this.setState({
      showEditModeDemo: true,
    })
  }

  // click Profile
  clickProfile() {
    this.props.onClickProfile()
  }

  // click Notification
  clickNotification() {
    this.props.onClickNotification()
  }

  // click Help
  clickHelp() {
    this.props.onClickHelp()
  }

  // click Outside
  clickOutside() {
    this.props.onClickOutside()
  }

  // click Notification Filter
  clickNotifyFilter(filterStr: string) {
    this.setState({
      filterTypeNotify: filterStr,
    })
  }

  // show Edit Mode
  showEditMode(isEdit: boolean) {
    this.props.setIsEditMode(isEdit)
    this.clickOutside()
  }

  // click Approve for Pending Approvals
  clickApprovePendingApprovals(index: number) {
    const pendingApprovals = this.state.pendingApprovals
    pendingApprovals[index].approved = true

    this.setState({
      pendingApprovals,
    })
  }

  render() {
    const { t } = this.props
    const { dataList } = { ...this.props.dashboardHeader }
    const {
      showProfile,
      showNotification,
      showHelp,
      headerWhiteBg,
      title,
      mobileShownIcon,
      headerBreadcrumbData,
      individualBusiness,
      showEditMode,
      isEditMode,
    } = { ...this.props }
    const { showLoginHelp, showEditModeDemo, filterTypeNotify, pendingApprovals } = {
      ...this.state,
    }

    return (
      <header
        className={`header dashboard-header ${
          !!headerBreadcrumbData ? 'height108' : ''
        } white-bg flex-grid ${headerWhiteBg ? 'white-bg' : ''} ${
          isEditMode && showEditMode ? 'edit-status' : ''
        }`}
      >
        {showLoginHelp && (
          <LoginHelpModalWindow
            title="Demo for home"
            videoId="BHACKCNDMW8"
            onClose={() => this.setState({ showLoginHelp: false })}
          />
        )}

        {showEditModeDemo && (
          <LoginHelpModalWindow
            title="Demo for edit mode"
            videoId="UqEUmyX0hjU"
            onClose={() => this.setState({ showEditModeDemo: false })}
          />
        )}

        {title && <h1 className="label-transparent">{title}</h1>}

        {!!dataList && (
          <React.Fragment>
            <div className="lefts colum" onClick={(event) => event.stopPropagation()}>
              {mobileShownIcon === 'Menu' && (
                <a
                  href="#javascript"
                  className="btn-menu label-transparent mobile-show desktop-hide"
                  onClick={(event) => {
                    event.stopPropagation()
                    this.props.onClickMobileMenu()
                  }}
                >
                  {t('common.btns.btn_menu')}
                </a>
              )}
              {mobileShownIcon === 'Back' && (
                <a
                  href="#javascript"
                  className="btn-back label-transparent mobile-show desktop-hide"
                  onClick={() => this.goBack()}
                >
                  {t('common.btns.back')}
                </a>
              )}
              {title === 'Move Money' && (
                <a
                  href="#javascript"
                  className="left-move-money-txt mobile-hide"
                  onClick={() => this.goBack()}
                >
                  {t('common.dynamicLabels.' + title)}
                </a>
              )}
              {title && title !== 'Move Money' && (
                <a href="#javascript" className="left-title-txt mobile-hide">
                  {t('common.dynamicLabels.' + title)}
                </a>
              )}
              {title === 'Contact Bank' && (
                <a href="#javascript" className="left-title-txt-mobile desktop-hide mobile-show">
                  {t('common.dynamicLabels.Contact Us')}
                </a>
              )}

              {!!headerBreadcrumbData && (
                <TopBreadcrumb headerBreadcrumbData={headerBreadcrumbData} />
              )}
            </div>
            <div className={`rights flex ${title === undefined ? 'no-title' : ''}`}>
              <div className="eidt-rights">
                <a href="#javascript" className="blue-link mobile-hide">
                  {t('common.dashboardHeader.headerContent.dashboard_preview')}
                </a>

                <a
                  href="#javascript"
                  className="blue-link mobile-hide"
                  onClick={(event) => {
                    this.clickEditModeDemo()
                    event.preventDefault()
                  }}
                >
                  {t('common.dashboardHeader.headerContent.edit_mode_demo')}
                </a>
                <div className="two-btn">
                  <a
                    href="#javascript"
                    className="btn btn-cancel"
                    onClick={() => this.showEditMode(false)}
                  >
                    {t('common.btns.cancel')}
                  </a>

                  <BaseTextLinkButton
                    label={t('common.btns.save')}
                    href={'#javascript'}
                    isButton
                    onClick={() => {
                      this.showEditMode(false)
                    }}
                  />
                </div>
              </div>

              <div className="">
                <Dropdown
                  bsPrefix="drop-module header-account-type-dropdown white-drop"
                  onSelect={(event) => this.onAccountTypeChangeDropdown(event)}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic-account">
                    {t(
                      'common.dynamicLabels.' +
                        (individualBusiness.replace(/^i/, 'I').replace(/^b/, 'B') + ' Account')
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {!!accountTypeDropdownOptions &&
                      accountTypeDropdownOptions.map((item, index) => (
                        <Dropdown.Item eventKey={item} key={index}>
                          {item === 'individual' && <i className="icons icon-user " />}
                          {item === 'business' && <i className="icons icon-build" />}
                          {t(
                            'common.dynamicLabels.' +
                              (item.replace(/^i/, 'I').replace(/^b/, 'B') + ' Account')
                          )}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <OutsideClickHandler onOutsideClick={() => this.clickOutside()}>
                <div className="tools-list flex ">
                  <div className={`tips-module user-photo-moudle ${showProfile ? 'open' : ''}`}>
                    {dataList.profile.photoUrl !== '' && (
                      <a
                        href="#javascript"
                        className="user-photo-account"
                        onClick={(event) => {
                          this.clickProfile()
                          event.preventDefault()
                        }}
                      >
                        <img src={dataList.profile.photoUrl} alt="img" />
                      </a>
                    )}
                    {dataList.profile.photoUrl === '' && (
                      <div
                        className="photo-area"
                        onClick={(event) => {
                          this.clickProfile()
                          event.preventDefault()
                        }}
                      >
                        <a href="#javascript" className="photo-img mobile-hide">
                          <div className="txt-photo blue">{dataList.profile.usernameLabel}</div>
                        </a>
                        <a
                          href="#javascript"
                          className="icons mobile-hide btn-arrow label-transparent"
                        >
                          arrow
                        </a>
                      </div>
                    )}
                    <div className="tip-panels">
                      <div className="top-close">
                        <a
                          href="#javascript"
                          className="btn-close label-transparent desktop-hide mobile-show"
                          onClick={(event) => {
                            this.clickProfile()
                            event.preventDefault()
                          }}
                        >
                          {t('common.btns.close')}
                        </a>
                      </div>
                      <div className="top-title no-underline">
                        <a
                          href="#javascript"
                          className="icons btn-back label-transparent"
                          onClick={(event) => {
                            this.clickProfile()
                            event.preventDefault()
                          }}
                        >
                          {t('common.btns.back')}
                        </a>
                        {t('common.dashboardHeader.headerContent.my_profile')}
                      </div>
                      <div className="user-line">
                        <div className="left-photo">
                          {dataList.profile.photoUrl !== '' && (
                            <img src={dataList.profile.photoUrl} alt="img" />
                          )}
                          {dataList.profile.photoUrl === '' && (
                            <div className="photo-img">
                              <div className="txt-photo blue">{dataList.profile.usernameLabel}</div>
                            </div>
                          )}
                        </div>
                        <div className="right-info">
                          <a href="#javascript" className="name">
                            {dataList.profile.username}
                          </a>
                          <div className="">
                            <Dropdown
                              bsPrefix="drop-module header-account-type-dropdown white-drop"
                              onSelect={(event) => this.onAccountTypeChangeDropdown(event)}
                            >
                              <Dropdown.Toggle variant="success" id="dropdown-basic-account-mobile">
                                {t(
                                  'common.dynamicLabels.' +
                                    (individualBusiness.replace(/^i/, 'I').replace(/^b/, 'B') +
                                      ' Account')
                                )}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {!!accountTypeDropdownOptions &&
                                  accountTypeDropdownOptions.map((item, index) => (
                                    <Dropdown.Item eventKey={item} key={index}>
                                      {item === 'individual' && <i className="icons icon-user " />}
                                      {item === 'business' && <i className="icons icon-build" />}
                                      {t(
                                        'common.dynamicLabels.' +
                                          (item.replace(/^i/, 'I').replace(/^b/, 'B') + ' Account')
                                      )}
                                    </Dropdown.Item>
                                  ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                      <div className="arrow-link">
                        <NavLink to="/accountsDashboardPage/manageProfile" className="btn-link">
                          {t('common.dashboardHeader.headerContent.manage_my_profile')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                        {individualBusiness === 'business' && (
                          <NavLink to="/manageAccess/accessDashboard" className="btn-link">
                            {t('common.dashboardHeader.headerContent.manage_access')}
                            <i className="icons icon-arrow" />
                          </NavLink>
                        )}
                        <NavLink to="/alerts/manageAlerts" className="btn-link">
                          {t('common.dashboardHeader.headerContent.manage_alerts')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                        <NavLink to="/documentRepository" className="btn-link">
                          {t('common.dashboardHeader.headerContent.document_repository')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                        {!isEditMode && showEditMode && (
                          <a
                            href="#javascript"
                            className="btn-link"
                            onClick={() => this.showEditMode(true)}
                          >
                            {t('common.dashboardHeader.headerContent.edit_mode')}
                            <i className="icons icon-arrow" />
                          </a>
                        )}
                        <NavLink to="/marketingPreferences" className="btn-link">
                          {t('common.dashboardHeader.headerContent.marketing_preferences')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                      </div>
                      <div className="bottom-area desktop-hide">
                        <div className="img-wrap">
                          <div className="white-txt">
                            {t('common.labels.apply_for_your_pre_approved')}
                          </div>
                          <div className="green-txt">£1M {t('common.labels.loan')}</div>
                          <div className="blue-btn">{t('common.labels.apply_now')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tips-module desktop-hide mobile-show user-photo-moudle ${
                      showHelp ? 'open' : ''
                    }`}
                  >
                    <div className="tip-panels">
                      <div className="top-close">
                        <a
                          href="#javascript"
                          className="btn-close label-transparent desktop-hide mobile-show"
                          onClick={(event) => {
                            this.clickHelp()
                            event.preventDefault()
                          }}
                        >
                          {t('common.btns.close')}
                        </a>
                      </div>
                      <div className="top-title">
                        {' '}
                        <a
                          href="#javascript"
                          className="icons btn-back label-transparent"
                          onClick={(event) => {
                            this.clickHelp()
                            event.preventDefault()
                          }}
                        >
                          {t('common.btns.back')}
                        </a>
                        {t('common.labels.help_support')}
                      </div>
                      <div className="help-line">
                        <div className="help-title">
                          {t('common.dashboardHeader.headerContent.need_help_with_txt')}?
                        </div>
                        <div className="help-txt">
                          {t(
                            'common.dashboardHeader.headerContent.our_representantives_always_online'
                          )}
                        </div>
                      </div>
                      <div className="arrow-link">
                        <NavLink to="/helpSupport/0" className="btn-link">
                          {t('common.loginFooter.faqs')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                        <NavLink to="/helpSupport/1" className="btn-link">
                          {t('common.loginFooter.contact_us')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                        <NavLink to="/helpSupport/2" className="btn-link">
                          {t('common.dashboardHeader.headerContent.regional_office')}
                          <i className="icons icon-arrow" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="sticker-wrap mobile-hide">
                    <a
                      href="#javascript"
                      className="icons icon-sticker label-transparent"
                      onClick={(event) => {
                        this.clickLoginHelp()
                        event.preventDefault()
                      }}
                    >
                      {t('common.btns.icon_sticker')}
                    </a>
                  </div>
                  {!!dataList.notifications.alerts &&
                    !!pendingApprovals &&
                    !!dataList.notifications.secureMessages && (
                      <div
                        className={`tips-module bell-module ${showNotification ? 'open' : ''}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <a
                          href="#javascript"
                          className="icons icon-bell label-transparent"
                          onClick={(event) => {
                            this.clickNotification()
                            event.preventDefault()
                          }}
                        >
                          {t('common.btns.icon_bell')}
                        </a>
                        {dataList.notifications.alerts.length +
                          dataList.notifications.secureMessages.length +
                          pendingApprovals.length >
                          0 && <span className="red-point mobile-show desktop-hide" />}
                        <span className="num ">
                          {dataList.notifications.alerts.length +
                            dataList.notifications.secureMessages.length +
                            pendingApprovals.length}
                        </span>
                        <div className="tip-panels">
                          <div className="mobile-title mobile-show desktop-hide">
                            <a
                              href="#javascript"
                              className="btn-back label-transparent"
                              onClick={(event) => {
                                this.clickNotification()
                                event.preventDefault()
                              }}
                            >
                              {t('common.btns.back')}
                            </a>
                            <span className="titles">
                              {t('common.dashboardHeader.headerContent.notifications')}
                            </span>
                          </div>
                          <div className="titles-line mobile-hide">
                            {t('common.dashboardHeader.headerContent.notifications')}
                          </div>
                          <div className="border-top-radius">
                            <div className="links-bar">
                              <ul>
                                <li>
                                  <BaseTextLinkButton
                                    classNameContainer={
                                      filterTypeNotify === 'Alerts' ? 'current' : ''
                                    }
                                    label={t('common.dashboardHeader.headerContent.alerts')}
                                    href={'#javascript'}
                                    onClick={() => {
                                      this.clickNotifyFilter('Alerts')
                                    }}
                                  >
                                    <span className="blue-point">
                                      {dataList.notifications.alerts.length}
                                    </span>
                                  </BaseTextLinkButton>
                                </li>
                                <li>
                                  <BaseTextLinkButton
                                    classNameContainer={
                                      filterTypeNotify === 'SecureMessages' ? 'current' : ''
                                    }
                                    label={t(
                                      'common.dashboardHeader.headerContent.secure_messages'
                                    )}
                                    href={'#javascript'}
                                    onClick={() => {
                                      this.clickNotifyFilter('SecureMessages')
                                    }}
                                  >
                                    <span className="blue-point">
                                      {dataList.notifications.secureMessages.length}
                                    </span>
                                  </BaseTextLinkButton>
                                </li>
                                <li>
                                  <BaseTextLinkButton
                                    classNameContainer={
                                      filterTypeNotify === 'PendingApprovals' ? 'current' : ''
                                    }
                                    label={t(
                                      'common.dashboardHeader.headerContent.pending_approvals'
                                    )}
                                    href={'#javascript'}
                                    onClick={() => {
                                      this.clickNotifyFilter('PendingApprovals')
                                    }}
                                  >
                                    <span className="blue-point">{pendingApprovals.length}</span>
                                  </BaseTextLinkButton>
                                </li>
                              </ul>
                            </div>
                            <div className="more-list">
                              {filterTypeNotify === 'Alerts' && dataList.notifications.alerts && (
                                <ul>
                                  {dataList.notifications.alerts.map((item, index) => (
                                    <li key={index}>
                                      <div className="green-txt">
                                        <BaseTextLinkButton
                                          label={item.title}
                                          href={'#javascript'}
                                        />
                                      </div>
                                      <p
                                        className="txt-p"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                      />
                                      <div className="gray-txt">{item.time}</div>
                                      <a
                                        href="#javascript"
                                        className="icons right-arrow label-transparent"
                                        onClick={(event) => event.preventDefault()}
                                      >
                                        {t('common.btns.icon_right_arrow')}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {filterTypeNotify === 'SecureMessages' &&
                                dataList.notifications.secureMessages && (
                                  <ul>
                                    {dataList.notifications.secureMessages.map((item, index) => (
                                      <li key={index}>
                                        <div className="green-txt">
                                          <BaseTextLinkButton
                                            label={item.title}
                                            href={'#javascript'}
                                          />
                                        </div>
                                        <p
                                          className="txt-p"
                                          dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                        <div className="gray-txt">{item.time}</div>
                                        <a
                                          href="#javascript"
                                          className="icons right-arrow label-transparent"
                                          onClick={(event) => event.preventDefault()}
                                        >
                                          {t('common.btns.icon_right_arrow')}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              {filterTypeNotify === 'PendingApprovals' && pendingApprovals && (
                                <ul>
                                  {pendingApprovals.map((item, index) => (
                                    <li key={index}>
                                      <div className="flex-grid">
                                        <div className="left-txt">
                                          <div className="green-txt">
                                            <BaseTextLinkButton
                                              label={item.title}
                                              href={'#javascript'}
                                            />
                                            {item.approved && (
                                              <span className="green-approved">
                                                {t('common.dashboardHeader.headerContent.approve')}
                                              </span>
                                            )}
                                          </div>
                                          <p
                                            className="txt-p"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                          />
                                          <div className="gray-txt">{item.time}</div>
                                        </div>
                                        <div className="right-btns">
                                          {item.approved && (
                                            <BaseTextLinkButton
                                              label={t('common.btns.submit')}
                                              href={'#javascript'}
                                              isButton
                                            />
                                          )}
                                          {!item.approved && (
                                            <BaseTextLinkButton
                                              label={t(
                                                'common.dashboardHeader.headerContent.approve'
                                              )}
                                              href={'#javascript'}
                                              isButton
                                              onClick={() => {
                                                this.clickApprovePendingApprovals(index)
                                              }}
                                            />
                                          )}
                                          {!item.approved && (
                                            <a href="#javascript" className="links green">
                                              {t('common.dashboardHeader.headerContent.reject')}
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="green-bar">
                              {filterTypeNotify === 'Alerts' && (
                                <BaseTextLinkButton
                                  label={t('common.dashboardHeader.headerContent.manage_alerts')}
                                  href={'/alerts/manageAlerts'}
                                  isNavLink
                                  isButton
                                />
                              )}

                              {filterTypeNotify === 'SecureMessages' && (
                                <BaseTextLinkButton
                                  label={t(
                                    'common.dashboardHeader.headerContent.view_secure_message'
                                  )}
                                  href={'/helpSupport/1'}
                                  isNavLink
                                >
                                  <i className="icons icon-arrow-line" />
                                </BaseTextLinkButton>
                              )}

                              {filterTypeNotify === 'PendingApprovals' && (
                                <BaseTextLinkButton
                                  label={t(
                                    'common.dashboardHeader.headerContent.view_pending_approval'
                                  )}
                                  href={'#javascript'}
                                >
                                  <i className="icons icon-arrow-line" />
                                </BaseTextLinkButton>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  <LogoutButton />
                </div>
              </OutsideClickHandler>
            </div>
          </React.Fragment>
        )}
      </header>
    )
  }
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

// @ts-ignore
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DashboardHeader))
