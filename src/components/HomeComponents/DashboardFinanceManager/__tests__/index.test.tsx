import React from 'react'
import { mount } from 'enzyme'
import DashboardFinanceManager, {
  IDashboardFinanceManagerProps,
  DashboardFinanceManager as DashboardFinanceManagerComponent,
} from '../index'
import _ from 'lodash'
import {
  WrapperType,
  AppContainer,
  nextScreen,
  beforeEachHelper,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'

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

jest.mock('react-apexcharts', () =>
  jest.fn(() => {
    return null
  })
)

jest.mock('apexcharts', () => ({
  exec: jest.fn(() => {
    return new Promise((resolve) => {
      resolve('uri')
    })
  }),
}))

const mockProps: IDashboardFinanceManagerProps = {
  data: [
    {
      dateLabelDay: '16',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
      eventsList: [
        {
          title: 'Central Apartement Loan Payment',
          dueTime: 'Due today',
          amount: '-£1,500.00',
          accountType: 'Current Account',
          accountId: '123',
        },
      ],
    },
    {
      dateLabelDay: '16',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
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
      dateLabelDay: '17',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
      eventsList: [
        {
          title: 'Payment Due to Screwfix',
          dueTime: 'Tomorrow',
          amount: '-£212.00',
          accountType: 'Loan Account',
          accountId: '123',
        },
      ],
    },
    {
      dateLabelDay: '18',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
      eventsList: [
        {
          title: 'Payment Due for Invoice #212',
          dueTime: 'In two days',
          amount: '-£411.00',
          accountType: 'Current Account',
          accountId: '123',
        },
      ],
    },
    {
      dateLabelDay: '18',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
      eventsList: [
        {
          title: 'Payment Due for Invoice #213',
          dueTime: 'In two days',
          amount: '-£602.00',
          accountType: 'Current Account',
          accountId: '123',
        },
      ],
    },
    {
      dateLabelDay: '19',
      dateLabelMonth: 'OCT',
      dateLabelYear: '2013',
      eventsList: [
        {
          title: 'Payment Due to Car Service',
          dueTime: 'In three days',
          amount: '-£922.00',
          accountType: 'Current Account',
          accountId: '123',
        },
      ],
    },
  ],
  t: (param: string) => {
    return param
  },
  dataChart: {
    title: 'Last 7 days',
    isEmpty: false,
    dataList: [
      [100, 220, 280, 330, 340, 350, 360],
      [130, 180, 230, 280, 200, 300, 250],
    ],
    xTitles: ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10'],
  },
}

describe('Dashboard finance manager testing', () => {
  let wrapper: WrapperType
  let component: DashboardFinanceManagerComponent
  let props: IDashboardFinanceManagerProps

  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <DashboardFinanceManager {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(DashboardFinanceManagerComponent)
      .instance() as DashboardFinanceManagerComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking View more', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-view'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should set type when click list icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.btn-list'), mouseEvent)
    await nextScreen(wrapper)
    expect(component.state.type).toEqual('list')
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should set type when click calendar icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.btn-calender'), mouseEvent)
    await nextScreen(wrapper)
    expect(component.state.type).toEqual('calendar')
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should set type when click icon finance', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.btn-finance'), mouseEvent)
    await nextScreen(wrapper)
    expect(component.state.type).toEqual('chart')
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
