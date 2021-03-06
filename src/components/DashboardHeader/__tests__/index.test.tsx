import React from 'react'
import { mount } from 'enzyme'
import DashboardHeader, {
  IDashboardHeaderProps,
  DashboardHeader as DashboardHeaderComponent,
} from '../index'
import {
  AppContainer,
  beforeEachHelper,
  getMouseEventDefault,
  nextScreen,
  onClick,
  WrapperType,
} from '../../../test/helper'
import _ from 'lodash'
import { LoginHelpModalWindow } from '../../LoginHelpModalWindow'
import { Dropdown } from 'react-bootstrap'

jest.mock('react-i18next', () => ({
  use: () => ({
    init: () => {},
  }),
  // @ts-ignore
  withTranslation: () => (Component: any) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: (param: string) => {
        return param
      },
    }
    return Component
  },
  t: (param: string) => {
    return param
  },
  useTranslation: () => {
    return {
      t: (param: string) => {
        return param
      },
      i18n: {
        language: 'en',
        changeLanguage: jest.fn().mockImplementation(() => {}),
      },
    }
  },
  // @ts-ignore
  Trans: ({ children }) => children,
}))

// Mock your i18n
jest.mock('../../../i18n', () => {
  return {
    useTranslation: () => {
      return {
        t: (param: string) => {
          return param
        },
        i18n: {
          language: 'en',
          changeLanguage: jest.fn().mockImplementation(() => {}),
        },
      }
    },
    withTranslation: () => (Component: any) => {
      Component.defaultProps = {
        ...Component.defaultProps,
        t: (param: string) => {
          return param
        },
      }
      return Component
    },
    t: (param: string) => {
      return param
    },
  }
})

jest.mock('i18next', () => ({
  init: () => {},
  use: () => {},
  t: (k: string) => k,
  withTranslation: () => (Component: any) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: (param: string) => {
        return param
      },
    }
    return Component
  },
  useTranslation: () => {
    return {
      t: (param: string) => {
        return param
      },
      i18n: {
        language: 'en',
        changeLanguage: jest.fn().mockImplementation(() => {}),
      },
    }
  },
}))

jest.mock('../../../store/actions/dataAction', () => {
  const result: any = {}
  const lodash = require('lodash')
  const testHelper = require('../../../test/helper')
  lodash.forEach(testHelper.dataActionMethods, (method: string) => {
    result[method] = jest.fn(() => jest.fn())
  })
  return result
})

const mockProps: IDashboardHeaderProps = {
  dashboardHeader: {
    dataList: {
      profile: {
        photoUrl: 'string',
        username: 'string',
        usernameShort: 'string',
        usernameLabel: 'string',
        accountType: 'string',
      },
      lastLogin: 'string',
      notifications: {
        alerts: [
          {
            title: 'string',
            content: 'string',
            time: 'string',
          },
        ],
        pendingApprovals: [],
        secureMessages: [],
      },
    },
  },
  showProfile: false,
  showNotification: false,
  showHelp: false,
  headerWhiteBg: false,
  title: 'string',
  history: {},
  isEditMode: false,
  showDemoLink: true,
  desktopShownIcon: 'string',
  mobileShownIcon: 'string',
  individualBusiness: 'string',
  location: {} as any,
  match: {} as any,
  t: (param: string) => {
    return param
  },
}

describe('DashboardHeader testing', () => {
  let props: IDashboardHeaderProps
  let wrapper: WrapperType
  let component: DashboardHeaderComponent
  let spyOnGobackHistory: jest.SpyInstance

  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      onClickMobileMenu: jest.fn(),
      onClickProfile: jest.fn(),
      onClickNotification: jest.fn(),
      onClickHelp: jest.fn(),
      onClickOutside: jest.fn(),
      setIndividualBusiness: jest.fn(),
      setIsEditMode: jest.fn(),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(DashboardHeaderComponent).instance() as DashboardHeaderComponent
    spyOnGobackHistory = jest.spyOn(component.props.history, 'goBack')
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should set default current plan index if dashboardHeader is null', async () => {
    await createWrapper({
      dashboardHeader: null,
    })
    expect(component).toBeDefined()
  })

  it('Should go back', async () => {
    await createWrapper({
      mobileShownIcon: 'Back',
    })
    onClick(wrapper.find('.btn-back.mobile-show.desktop-hide'))
    expect(spyOnGobackHistory).toHaveBeenCalled()
    spyOnGobackHistory.mockClear()

    await createWrapper({
      title: 'Move Money',
    })
    onClick(wrapper.find('.left-move-money-txt.mobile-hide'))
    expect(spyOnGobackHistory).toHaveBeenCalled()
    spyOnGobackHistory.mockClear()
  })

  it('Should show edit mode demo', async () => {
    onClick(wrapper.find('.rights .eidt-rights .blue-link.mobile-hide').at(1))
    await nextScreen(wrapper)
    expect(component.state.showEditModeDemo).toBeTruthy()

    // @ts-ignore
    wrapper.find(LoginHelpModalWindow).props().onClose()
    await nextScreen(wrapper)
    expect(component.state.showEditModeDemo).toBeFalsy()
  })

  it('Should call clickProfile', async () => {
    onClick(wrapper.find('.tips-module.user-photo-moudle .user-photo-account'))
    expect(props.onClickProfile).toHaveBeenCalled()
    ;(props.onClickProfile as jest.Mock).mockClear()

    const dashboardHeader = _.cloneDeep(mockProps.dashboardHeader)
    // @ts-ignore
    _.set(dashboardHeader, 'dataList.profile.photoUrl', '')
    await createWrapper({
      mobileShownIcon: 'Back',
      dashboardHeader,
    })
    onClick(wrapper.find('.tips-module.user-photo-moudle .photo-area'))
    expect(props.onClickProfile).toHaveBeenCalled()
    ;(props.onClickProfile as jest.Mock).mockClear()

    onClick(
      wrapper
        .find('.tips-module.user-photo-moudle .tip-panels .btn-close.desktop-hide.mobile-show')
        .first()
    )
    expect(props.onClickProfile).toHaveBeenCalled()
    ;(props.onClickProfile as jest.Mock).mockClear()

    onClick(wrapper.find('.tips-module.user-photo-moudle .tip-panels .icons.btn-back').first())
    expect(props.onClickProfile).toHaveBeenCalled()
    ;(props.onClickProfile as jest.Mock).mockClear()
  })

  it('Should call clickNotification', async () => {
    // @ts-ignore
    props.dashboardHeader.dataList.notifications = {
      alerts: [
        {
          title: 'Payment alert',
          content: 'Your loan payment for <strong>#CI 4559 8997 689 8</strong> succesfully paid.',
          time: 'Aug 15, 2020, 9:35',
        },
        {
          title: 'High value transaction alert',
          content:
            'Transfer incoming <strong>£20,0154.00</strong> to your account <strong>#1094 4545  3121 01</strong>.',
          time: 'Aug 16, 2020, 9:35',
        },
        {
          title: 'Business Account',
          content:
            'We detected cash withdrawal <strong>£2,400.00</strong> from account <strong>#1094 4545 3121 01</strong>.',
          time: 'Aug 14, 2020, 9:35',
        },
      ],
      secureMessages: [
        {
          title: 'New Device Added',
          content:
            'New mobile phone with serial number <strong>#CI 4559 8997 689 8</strong> has been added to your account.',
          time: 'Oct 1, 2020, 9:35 AM',
        },
      ],
      pendingApprovals: [
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: true,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
      ],
    }
    props.onClickNotification = jest.fn()
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    onClick(wrapper.find('.tips-module.bell-module .icons.icon-bell'))
    expect(props.onClickNotification).toHaveBeenCalled()
    ;(props.onClickNotification as jest.Mock).mockClear()

    onClick(wrapper.find('.tips-module.bell-module .tip-panels .btn-back'))
    expect(props.onClickNotification).toHaveBeenCalled()
    ;(props.onClickNotification as jest.Mock).mockClear()
  })

  it('Should call clickHelp', async () => {
    props.onClickHelp = jest.fn()
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    onClick(
      wrapper.find(
        '.tips-module.desktop-hide.mobile-show.user-photo-moudle .btn-close.desktop-hide.mobile-show'
      )
    )
    expect(props.onClickHelp).toHaveBeenCalled()
    ;(props.onClickHelp as jest.Mock).mockClear()

    onClick(wrapper.find('.tips-module.desktop-hide.mobile-show.user-photo-moudle .icons.btn-back'))
    expect(props.onClickHelp).toHaveBeenCalled()
    ;(props.onClickHelp as jest.Mock).mockClear()
  })

  it('Should update filterTypeNotify', async () => {
    // @ts-ignore
    props.dashboardHeader.dataList.notifications = {
      alerts: [
        {
          title: 'Payment alert',
          content: 'Your loan payment for <strong>#CI 4559 8997 689 8</strong> succesfully paid.',
          time: 'Aug 15, 2020, 9:35',
        },
        {
          title: 'High value transaction alert',
          content:
            'Transfer incoming <strong>£20,0154.00</strong> to your account <strong>#1094 4545  3121 01</strong>.',
          time: 'Aug 16, 2020, 9:35',
        },
        {
          title: 'Business Account',
          content:
            'We detected cash withdrawal <strong>£2,400.00</strong> from account <strong>#1094 4545 3121 01</strong>.',
          time: 'Aug 14, 2020, 9:35',
        },
      ],
      secureMessages: [
        {
          title: 'New Device Added',
          content:
            'New mobile phone with serial number <strong>#CI 4559 8997 689 8</strong> has been added to your account.',
          time: 'Oct 1, 2020, 9:35 AM',
        },
      ],
      pendingApprovals: [
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: true,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
      ],
    }
    props.onClickNotification = jest.fn()
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    onClick(wrapper.find('.border-top-radius .links-bar .green-link').at(0))
    await nextScreen(wrapper)
    component = wrapper.find(DashboardHeaderComponent).instance() as DashboardHeaderComponent
    expect(component.state.filterTypeNotify).toEqual('Alerts')

    onClick(wrapper.find('.border-top-radius .links-bar .green-link').at(1))
    await nextScreen(wrapper)
    component = wrapper.find(DashboardHeaderComponent).instance() as DashboardHeaderComponent
    expect(component.state.filterTypeNotify).toEqual('SecureMessages')

    onClick(wrapper.find('.border-top-radius .links-bar .green-link').at(2))
    await nextScreen(wrapper)
    component = wrapper.find(DashboardHeaderComponent).instance() as DashboardHeaderComponent
    expect(component.state.filterTypeNotify).toEqual('PendingApprovals')
  })

  it('Should change state on close login help window', async () => {
    props.showDemoLink = true
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    onClick(wrapper.find('.blue-link.mobile-hide').at(1))
    await nextScreen(wrapper)
    expect(wrapper.find('DashboardHeader').instance().state).toMatchObject({
      showEditModeDemo: true,
    })

    // @ts-ignore
    wrapper.find(LoginHelpModalWindow).props().onClose()
    await nextScreen(wrapper)
    expect(wrapper.find('DashboardHeader').instance().state).toMatchObject({ showLoginHelp: false })
  })

  it('Should call account type change on dropdown change', async () => {
    props.headerBreadcrumbData = [
      {
        pageName: 'pageName1',
        pageUrl: 'www.test1.com',
      },
    ]
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper.find(Dropdown).at(0).props().onSelect('Test')
    expect(props.setIndividualBusiness).toHaveBeenCalledWith('Test')
  })

  it('Should call onClickMobileMenu', async () => {
    await createWrapper({
      mobileShownIcon: 'Menu',
    })

    onClick(wrapper.find('.lefts .btn-menu.mobile-show.desktop-hide'))
    expect(props.onClickMobileMenu).toHaveBeenCalled()
    ;(props.onClickMobileMenu as jest.Mock).mockClear()
  })

  it('Should highlight current individual business', async () => {
    await createWrapper({
      individualBusiness: 'individual',
    })
    expect(wrapper).toBeDefined()

    await createWrapper({
      individualBusiness: 'business',
    })
    await nextScreen(wrapper)
    expect(wrapper).toBeDefined()
  })

  it('Should show profile', async () => {
    await createWrapper({
      showProfile: true,
    })
    expect(wrapper.find('.tips-module.user-photo-moudle.open').length).toBeTruthy()
  })

  it('Should show notification', async () => {
    await createWrapper({
      showNotification: true,
    })
    expect(wrapper.find('.tips-module.bell-module.open').length).toBeTruthy()
  })

  it('Should prevent default and stop propagation when clicking some icon', async () => {
    // @ts-ignore
    props.dashboardHeader.dataList.notifications = {
      alerts: [
        {
          title: 'Payment alert',
          content: 'Your loan payment for <strong>#CI 4559 8997 689 8</strong> succesfully paid.',
          time: 'Aug 15, 2020, 9:35',
        },
        {
          title: 'High value transaction alert',
          content:
            'Transfer incoming <strong>£20,0154.00</strong> to your account <strong>#1094 4545  3121 01</strong>.',
          time: 'Aug 16, 2020, 9:35',
        },
        {
          title: 'Business Account',
          content:
            'We detected cash withdrawal <strong>£2,400.00</strong> from account <strong>#1094 4545 3121 01</strong>.',
          time: 'Aug 14, 2020, 9:35',
        },
      ],
      secureMessages: [
        {
          title: 'New Device Added',
          content:
            'New mobile phone with serial number <strong>#CI 4559 8997 689 8</strong> has been added to your account.',
          time: 'Oct 1, 2020, 9:35 AM',
        },
      ],
      pendingApprovals: [
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: true,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
        {
          title: 'Business Bills',
          content: 'Expenses Account, Faster payment Type, <strong>£49.00</strong> Amount.',
          time: '30 Jun 2020, 9:35 AM',
          approved: false,
        },
      ],
    }
    props.onClickNotification = jest.fn()
    wrapper = mount(
      <AppContainer>
        <DashboardHeader {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.lefts'), mouseEvent)
    expect(mouseEvent.stopPropagation).toHaveBeenCalled()
    ;(mouseEvent.stopPropagation as jest.Mock).mockClear()

    // onClick(wrapper.find('.tips-module.two-change.mobile-hide').at(0), mouseEvent)
    // expect(mouseEvent.stopPropagation).toHaveBeenCalled()
    // ;(mouseEvent.stopPropagation as jest.Mock).mockClear()

    onClick(wrapper.find('.tips-module.bell-module').at(0), mouseEvent)
    expect(mouseEvent.stopPropagation).toHaveBeenCalled()
    ;(mouseEvent.stopPropagation as jest.Mock).mockClear()

    // onClick(wrapper.find('.more-list li .green-txt .green-link').at(0), mouseEvent)
    // expect(mouseEvent.preventDefault).toHaveBeenCalled()
    // ;(mouseEvent.preventDefault as jest.Mock).mockClear()

    onClick(wrapper.find('.more-list li .icons.right-arrow').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()

    onClick(wrapper.find('.border-top-radius .links-bar .green-link').at(1))
    await nextScreen(wrapper)
    component = wrapper.find(DashboardHeaderComponent).instance() as DashboardHeaderComponent
    expect(component.state.filterTypeNotify).toEqual('SecureMessages')

    // onClick(wrapper.find('.green-txt .green-link').at(0), mouseEvent)
    // expect(mouseEvent.preventDefault).toHaveBeenCalled()
    // ;(mouseEvent.preventDefault as jest.Mock).mockClear()

    onClick(wrapper.find('.icons.right-arrow').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()
  })
})
