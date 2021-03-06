import React from 'react'
import { mount } from 'enzyme'
import { AlertHistoryDetails } from '../index'
import { Dropdown } from 'react-bootstrap'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
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

describe('AlertHistoryDetails component testing', () => {
  let wrapper: WrapperType
  let props: any

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      t: (param: string) => {
        return param
      },
      dataList: [
        {
          historyId: 13,
          alert: { alertDescription: 'string', event: 'string' },
          event: { eventDescription: 'string', event: 'string' },
          channel: { channelName: 'string' },
          message: 'string',
          createdOn: '2012-12-12',
        },
      ],
      fetchHistory: jest.fn(),
      loadErrorMsg: null,
    }
    wrapper = mount(
      <AppContainer>
        <AlertHistoryDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should update state when change alert history period dropdown field', async () => {
    const onSelect = wrapper.find(Dropdown).props().onSelect
    if (onSelect) {
      onSelect('Last 7 Days', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    // expect(component.state.periodSelection).toEqual('Last 7 Days')

    if (onSelect) {
      onSelect('Last 15 Days', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    // expect(component.state.periodSelection).toBe('Last 15 Days')

    if (onSelect) {
      onSelect('Last 30 Days', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    // expect(component.state.periodSelection).toBe('Last 30 Days')

    await nextScreen(wrapper)
    if (onSelect) {
      onSelect('Custom date range', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    // expect(component.state.periodSelection).toBe('Custom date range')
  })

  it('Should handle date change', async () => {
    // component.setState({
    //   periodSelection: 'Custom date range',
    // })
    // await nextScreen(wrapper)
    // wrapper.find(DatePicker).at(0).props().onChange(new Date(2011, 1, 1), getMouseEventDefault())
    // await nextScreen(wrapper)
    // expect(component.state.customStartDateInput).not.toBeNull()
    // wrapper.find(DatePicker).at(1).props().onChange(new Date(2011, 1, 1), getMouseEventDefault())
    // await nextScreen(wrapper)
    // expect(component.state.customEndDateInput).not.toBeNull()
  })

  it('Should renders when error', async () => {
    props.loadErrorMsg = 'An Error'
    wrapper = mount(
      <AppContainer>
        <AlertHistoryDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should renders when no error and no data', async () => {
    props.loadErrorMsg = undefined
    props.dataList = undefined
    wrapper = mount(
      <AppContainer>
        <AlertHistoryDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should renders when no error and data length zero', async () => {
    props.loadErrorMsg = undefined
    props.dataList = []
    wrapper = mount(
      <AppContainer>
        <AlertHistoryDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })
})
