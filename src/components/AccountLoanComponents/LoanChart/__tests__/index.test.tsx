import React from 'react'
import { mount } from 'enzyme'
import LoanChart, { LoanChart as LoanChartComponent } from '../index'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../../test/helper'

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

describe('LoanChart component testing', () => {
  let wrapper: WrapperType
  let component: LoanChartComponent

  beforeAll(() => {
    const div = document.createElement('div')
    div.id = 'id-double-line-chart'
    document.body.appendChild(div)
  })

  beforeEach(async () => {
    beforeEachHelper()
    const props = {
      t: (param: string) => {
        return param
      },
      dataList: {
        title: 'string',
        loanRepaidPercentage: 'string',
        originalLoanAmount: 'string',
        repaidAmount: 'string',
      },
    }
    wrapper = mount(
      <AppContainer>
        <LoanChart {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(LoanChartComponent).instance() as LoanChartComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should draw chart when receive props', async () => {
    const spyOnDrawChart = jest.spyOn(component, 'drawChart')
    component.componentDidUpdate({
      dataList: {
        loanRepaidPercentage: '34%',
      },
    })
    await nextScreen(wrapper)
    expect(spyOnDrawChart).toHaveBeenCalled()
  })
})
