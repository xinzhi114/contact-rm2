import React from 'react'
import { mount } from 'enzyme'
import { FinanceTab, IFinanceTabProps } from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
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
jest.mock('../../../../i18n', () => {
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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => ({
    rm: {
      id: 1,
      portfolio: '',
      employeeId: 2,
      name: '',
      phoneNumber: '',
      email: '',
      role: '',
      description: '',
      address: '',
      photoURL: '',
      teamName: '',
      teamEmail: '',
      teamManager: '',
    },
  }),
  useDispatch: () => jest.fn(),
}))

describe('FinanceTab component testing', () => {
  let wrapper: WrapperType
  let props: IFinanceTabProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      clickTab: jest.fn(),
      currentTabIndex: 'Account Aggregation',
      tabArray: ['Account Aggregation', 'Income & Outgoings', 'Spending', 'Budgeting'],
      accountProfile: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Account Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
    }
    wrapper = mount(
      <AppContainer>
        <FinanceTab {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking tab', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-link').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.clickTab).toHaveBeenCalled()
  })

  it('Should prevent default when clicking user photo', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.user-photo-fm'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking more icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-more'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should call click tab when click dropdown', async () => {
    // @ts-ignore
    wrapper.find(Dropdown).props().onSelect('Spending')
    expect(props.clickTab).toHaveBeenCalled()
  })
})
