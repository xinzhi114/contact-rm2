import React from 'react'
import { mount } from 'enzyme'
import EStatementsLeftFilter, { EStatementsLeftFilter as EStatementsLeftFilterComponent } from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
import { Dropdown } from 'react-bootstrap'
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

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

describe('EStatementsLeftFilter component testing', () => {
  let wrapper: WrapperType
  let component: EStatementsLeftFilterComponent
  let props: any

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      onApply: jest.fn(),
      dataList: {
        accountList: [
          {
            accountType: 'Saving Account',
            accountNumber: '161-241-51321',
          },
          {
            accountType: 'Current Account',
            accountNumber: '161-241-51322',
          },
        ],
        statementOfInterest: {
          description:
            'Lorem ipsum dolor sit amet, consecteture adipisicing elit, sed diam nonumy ermod tempor invidunt',
          lastUpdated: 'Sep 28, 2020',
        },
      },
      t: (param: string) => {
        return param
      },
      tabName: 'Account statement',
    }
    wrapper = mount(
      <AppContainer>
        <EStatementsLeftFilter {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(EStatementsLeftFilterComponent)
      .instance() as EStatementsLeftFilterComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking `Apply`', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.gray-item').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onApply).toHaveBeenCalled()

    // @ts-ignore
    wrapper.find(Dropdown).at(1).props().onSelect('Statement of Interest')
    await nextScreen(wrapper)
    expect(props.onApply).toHaveBeenCalled()
  })

  it('Should change state when select account dropdown', async () => {
    // @ts-ignore
    wrapper.find(Dropdown).at(0).props().onSelect('Current Account')
    await nextScreen(wrapper)
    expect(component.state.accountSelection).toBe('Current Account')
  })

  it('Should change state when change `specificDateInput`', async () => {
    props.tabName = 'Statement of interest for specific period'
    wrapper = mount(
      <AppContainer>
        <EStatementsLeftFilter {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper.find(DateRangePicker).props().onChange(new Date('2012-12-12'))
    await nextScreen(wrapper)
    component = wrapper
      .find(EStatementsLeftFilterComponent)
      .instance() as EStatementsLeftFilterComponent
    expect(component.state.specificDateInput).toEqual(new Date('2012-12-12'))
  })

  it('Should change state when change `transactionName`', async () => {
    props.tabName = 'Statement of interest for specific period'
    wrapper = mount(
      <AppContainer>
        <EStatementsLeftFilter {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper
      .find('input')
      .at(8)
      .simulate('change', { target: { value: 'dateRange' } })
    await nextScreen(wrapper)
    component = wrapper
      .find(EStatementsLeftFilterComponent)
      .instance() as EStatementsLeftFilterComponent
    expect(component.state.transactionName).toEqual('dateRange')
  })

  it('Should change state when select year selection', async () => {
    // @ts-ignore
    wrapper.find(Dropdown).at(1).props().onSelect('Statement of Interest')
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper.find(Dropdown).last().props().onSelect('2019')
    await nextScreen(wrapper)
    expect(component.state.yearSelection).toBe('2019')
  })
})
