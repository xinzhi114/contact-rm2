import React from 'react'
import { mount } from 'enzyme'
import IncomeOutgoingsChart, { IncomeOutgoingsChart as IncomeOutgoingsChartComponent } from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'

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

describe('IncomeOutgoingsChart component testing', () => {
  let wrapper: WrapperType
  let component: IncomeOutgoingsChartComponent
  let props: any

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      chartData: {
        title: 'Last 30 days',
        isEmpty: false,
        dataList: [
          [
            100,
            180,
            190,
            200,
            270,
            300,
            180,
            190,
            220,
            210,
            350,
            280,
            290,
            250,
            290,
            300,
            190,
            190,
            200,
            220,
            300,
            180,
            190,
            200,
            270,
            300,
            180,
            190,
            200,
            270,
          ],
          [
            140,
            120,
            130,
            140,
            230,
            300,
            180,
            190,
            200,
            270,
            300,
            180,
            190,
            200,
            270,
            300,
            180,
            190,
            200,
            270,
            300,
            180,
            290,
            220,
            270,
            310,
            280,
            290,
            220,
            120,
          ],
        ],
        xTitles: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
      },
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <IncomeOutgoingsChart {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(IncomeOutgoingsChartComponent)
      .instance() as IncomeOutgoingsChartComponent
  })

  it('Should render without crashing', () => {
    global.innerWidth = 1000
    props = {
      chartData: {
        title: 'Last 7 days',
        isEmpty: true,
        dataList: [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
        ],
        xTitles: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <IncomeOutgoingsChart {...props} />
      </AppContainer>
    )
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should render without crashing when empty', () => {
    global.innerWidth = 1000
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()

    component.state.options.tooltip.custom({
      series: [[100]],
      seriesIndex: 0,
      dataPointIndex: 0,
      w: 0,
    })
    component.state.options.tooltip.custom({
      series: [[120]],
      seriesIndex: 0,
      dataPointIndex: 0,
      w: 0,
    })
    component.state.options.tooltip.custom({
      series: [['']],
      seriesIndex: 0,
      dataPointIndex: 0,
      w: 0,
    })
    component.state.options.yaxis.labels.formatter(123)
    component.state.options.yaxis.labels.formatter(4)
  })
})
