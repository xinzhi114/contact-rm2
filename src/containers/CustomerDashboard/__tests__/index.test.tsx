import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act } from 'react-dom/test-utils'
import { Store, AnyAction } from 'redux'
import CustomerDashboard, {
  CustomerDashboard as CustomerDashboardComponent,
  IDashboardProps,
} from '../index'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import _ from 'lodash'
import {
  WrapperType,
  AppContainer,
  nextScreen,
  beforeEachHelper,
  getMouseEventDefault,
} from '../../../test/helper'
import ContactUs from '../../../components/AccountLoanComponents/ContactUs'

const mockStore = configureStore([])
jest.mock('../../../store/actions/dataAction', () => {
  const result: any = {}
  const lodash = require('lodash')
  const testHelper = require('../../../test/helper')
  lodash.forEach(testHelper.dataActionMethods, (method: string) => {
    result[method] = jest.fn(() => jest.fn())
  })
  return result
})

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

document.getElementById = jest.fn().mockImplementation(() => {
  return {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  }
})

jest.mock('accessible-nprogress', () => {
  return {
    // nprogress: jest.fn({ parent: 'main' }),
    start: jest.fn(),
    done: jest.fn(),
    configure: jest.fn(),
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => ({}),
  useDispatch: () => jest.fn(),
}))

const mockProps: IDashboardProps = {
  t: jest.fn(),
  db: {
    dataList: {
      upcomingActivityEvents: [
        {
          dateLabelYear: '2020',
          dateLabelDay: '14',
          dateLabelMonth: 'Dec',
          eventsList: [
            {
              title: 'Central Apartement Loan Payment',
              dueTime: 'Due today',
              amount: '-£1,500.00',
              accountType: 'Current Account',
              accountId: '123',
            },
            {
              title: 'Central Apartement Payment',
              dueTime: 'Due today',
              amount: '-£1,200.00',
              accountType: 'Loan Account',
              accountId: '453',
            },
          ],
        },
        {
          dateLabelYear: '2020',
          dateLabelDay: '18',
          dateLabelMonth: 'Dec',
          eventsList: [
            {
              title: 'Payment Due to Screwfix',
              dueTime: 'Due today',
              amount: '-£322.00',
              accountType: 'Loan Account',
              accountId: '123',
            },
          ],
        },
        {
          dateLabelYear: '2020',
          dateLabelDay: '27',
          dateLabelMonth: 'Dec',
          eventsList: [
            {
              title: 'Payment Due to Screwfix',
              dueTime: 'Due today',
              amount: '-£922.00',
              accountType: 'Loan Account',
              accountId: '153',
            },
            {
              title: 'Payment Due',
              dueTime: 'Due today',
              amount: '-£322.00',
              accountType: 'Loan Account',
              accountId: '13',
            },
          ],
        },
        {
          dateLabelYear: '2021',
          dateLabelDay: '06',
          dateLabelMonth: 'Jan',
          eventsList: [
            {
              title: 'Payment Due for Invoice #212',
              dueTime: 'In two days',
              amount: '-£411.00',
              accountType: 'Loan Account',
              accountId: '123',
            },
            {
              title: 'Payment Due for Invoice #212',
              dueTime: 'In two days',
              amount: '-£411.00',
              accountType: 'Loan Account',
              accountId: '123',
            },
          ],
        },
      ],
      mostActiveAccounts: [
        {
          accountType: 'Current Account',
          accountNumber: '1094 4545 3121 01',
          remainingBalance: '£179,000',
          overdraft: '£2,000',
        },
        {
          accountType: 'Saving Account',
          accountNumber: '1094 4536 5765 85',
          remainingBalance: '£350,028',
          overdraft: '£6,200',
        },
      ],
      portfolioOverview: {
        carousel: [
          {
            companyName: 'XYZ COMPANY',
            price: '£2,123,000.00',
            changeType: 'inscrease',
            changeFromLastMonth: '55,760',
            productList: [
              {
                iconUrl: '/assets/filter-build@2x.png',
                price: '£3,000,000.00',
                title: 'PROPERTY Equity',
              },
              {
                iconUrl: '/assets/savings@2x.png',
                price: '£80,000.00',
                title: 'SAVINGS',
              },
              {
                iconUrl: '/assets/briefcase.svg',
                price: '£43,000.00',
                title: 'Current Accounts',
              },
              {
                iconUrl: '/assets/loan@2x.png',
                price: '-£800,000.00',
                title: 'Loan',
              },
            ],
          },
          {
            companyName: 'ACME COMPANY',
            price: '£4,123,000.00',
            changeType: 'inscrease',
            changeFromLastMonth: '25,760',
            productList: [
              {
                iconUrl: '/assets/filter-build@2x.png',
                price: '£1000000.00',
                title: 'PROPERTY Equity',
              },
              {
                iconUrl: '/assets/savings@2x.png',
                price: '£20000.00',
                title: 'SAVINGS',
              },
              {
                iconUrl: '/assets/briefcase.svg',
                price: '£43000.00',
                title: 'Current Accounts',
              },
              {
                iconUrl: '/assets/loan@2x.png',
                price: '-£800,000.00',
                title: 'Loan',
              },
            ],
          },
          {
            companyName: 'AC COMPANY',
            price: '£78,123,000.00',
            changeType: 'inscrease',
            changeFromLastMonth: '25,760',
            productList: [
              {
                iconUrl: '/assets/filter-build@2x.png',
                price: '£3,000,000.00',
                title: 'PROPERTY Equity',
              },
              {
                iconUrl: '/assets/savings@2x.png',
                price: '£80,000.00',
                title: 'SAVINGS',
              },
              {
                iconUrl: '/assets/briefcase.svg',
                price: '£43,000.00',
                title: 'Current Accounts',
              },
              {
                iconUrl: '/assets/loan@2x.png',
                price: '-£800,000.00',
                title: 'Loan',
              },
            ],
          },
          {
            companyName: 'ACMEXYZ COMPANY',
            price: '£3,123,000.00',
            changeType: 'inscrease',
            changeFromLastMonth: '55,760',
            productList: [
              {
                iconUrl: '/assets/filter-build@2x.png',
                price: '£3,000,000.00',
                title: 'PROPERTY Equity',
              },
              {
                iconUrl: '/assets/savings@2x.png',
                price: '£80,000.00',
                title: 'SAVINGS',
              },
              {
                iconUrl: '/assets/briefcase.svg',
                price: '£43,000.00',
                title: 'Current Accounts',
              },
              {
                iconUrl: '/assets/loan@2x.png',
                price: '-£800,000.00',
                title: 'Loan',
              },
            ],
          },
        ],
      },
      contactUs: {
        phoneNumber: '+44 20 7646 0612',
        email: 'support@odyssey.com',
      },
      lastLogin: {
        loginTime: '12 Oct 2020, 1:19:50 PM',
        loginIP: '185.86.151.11',
      },
      relationshipManager: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
    },
  },
}

describe('CustomerDashboard container testing', () => {
  let store: Store<any, AnyAction>
  let wrapper: WrapperType
  let component: CustomerDashboardComponent
  let props: IDashboardProps

  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <CustomerDashboard {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(CustomerDashboardComponent).instance() as CustomerDashboardComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should render the container without crashing', async () => {
    store = mockStore({
      dataReducer: {
        db: {
          dataList: mockProps.db.dataList,
        },
      },
    })
    store.dispatch = jest.fn()
    await act(async () => {
      const localWrapper = mount(
        <MemoryRouter>
          <Provider store={store}>
            {/*
            // @ts-ignore */}
            <CustomerDashboard />
          </Provider>
        </MemoryRouter>
      )
      expect(localWrapper).not.toEqual(undefined)
    })
  })

  it('Should close and open the left sidebar correctly', async () => {
    store = mockStore({
      dataReducer: {
        db: {
          dataList: mockProps.db.dataList,
        },
      },
    })
    store.dispatch = jest.fn()
    await act(async () => {
      const localWrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            {/*
            // @ts-ignore */}
            <CustomerDashboard />
          </MemoryRouter>
        </Provider>
      )
      // check whether left sidebar rendered correctly
      expect(localWrapper.find(DashboardLeftSidebar).length).toEqual(1)

      localWrapper.unmount()
    })
  })

  it('Should prevent default when click contact us arrow first', async () => {
    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('individual')
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    // @ts-ignore
    wrapper.find(ContactUs).first().props().onClickArrow(mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when click contact us arrow last', async () => {
    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('individual')
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    // @ts-ignore
    wrapper.find(ContactUs).last().props().onClickArrow(mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should only change individual business if it is individual or business', async () => {
    component.setState({
      individualBusiness: '',
    })
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('notfound')
    await nextScreen(wrapper)
    expect(component.state.individualBusiness).toBeFalsy()

    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('business')
    await nextScreen(wrapper)
    expect(component.state.individualBusiness).toBeTruthy()

    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('individual')
    await nextScreen(wrapper)
    expect(component.state.individualBusiness).toBeTruthy()
  })
})
