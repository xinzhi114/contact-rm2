import React from 'react'
import { mount } from 'enzyme'
import { IAlertsSelectAccountProps, AlertsSelectAccount } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
import { Dropdown } from 'react-bootstrap'
import _ from 'lodash'

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

const mockProps: IAlertsSelectAccountProps = {
  currentIndex: 0,
  accountAlerts: [
    {
      accountId: 'string',
      accountType: 'string',
      customerUniqueId: 'string',
      events: [
        {
          eventConfId: 13,
          channels: [],
          userThresholdValue: {
            thresholdId: 13,
            currency: {
              currencyId: 13,
              currency: 'string',
              currencySymbol: 'string',
              active: true,
            },
            thresholdValue: 13,
            lastThresholdValue: 13,
            createdOn: '2012-12-12',
          },
          event: {
            event: 'string',
            eventDescription: 'string',
            valueEditable: false,
            active: true,
          },
          updating: true,
          active: true,
        },
        {
          eventConfId: 13,
          channels: [],
          userThresholdValue: {
            thresholdId: 13,
            currency: {
              currencyId: 13,
              currency: 'string',
              currencySymbol: 'string',
              active: true,
            },
            thresholdValue: 13,
            lastThresholdValue: 13,
            createdOn: '2012-12-12',
          },
          event: {
            event: 'string',
            eventDescription: 'string',
            valueEditable: false,
            active: true,
          },
          updating: true,
          active: true,
        },
      ],
    },
    {
      accountId: 'string',
      accountType: 'string',
      customerUniqueId: 'string',
      events: [
        {
          eventConfId: 13,
          channels: [],
          userThresholdValue: {
            thresholdId: 13,
            currency: {
              currencyId: 13,
              currency: 'string',
              currencySymbol: 'string',
              active: true,
            },
            thresholdValue: 13,
            lastThresholdValue: 13,
            createdOn: '2012-12-12',
          },
          event: {
            event: 'string',
            eventDescription: 'string',
            valueEditable: false,
            active: true,
          },
          updating: true,
          active: true,
        },
        {
          eventConfId: 13,
          channels: [],
          userThresholdValue: {
            thresholdId: 13,
            currency: {
              currencyId: 13,
              currency: 'string',
              currencySymbol: 'string',
              active: true,
            },
            thresholdValue: 13,
            lastThresholdValue: 13,
            createdOn: '2012-12-12',
          },
          event: {
            event: 'string',
            eventDescription: 'string',
            valueEditable: false,
            active: true,
          },
          updating: true,
          active: true,
        },
      ],
    },
  ],
  selectAccount: jest.fn(),
}

describe('AlertsSelectAccount component testing', () => {
  let wrapper: WrapperType
  let props: IAlertsSelectAccountProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <AlertsSelectAccount {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Should update account selection when change dropdown value', async () => {
    props.currentIndex = 1
    wrapper = mount(
      <AppContainer>
        <AlertsSelectAccount {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const onSelect = wrapper.find(Dropdown).props().onSelect
    if (onSelect) onSelect('string', getMouseEventDefault())
    await nextScreen(wrapper)
    expect(props.selectAccount).toHaveBeenCalled()
  })

  it('Should select account when click on tab-bar', async () => {
    onClick(wrapper.find('.tab-bar').at(0))
    expect(props.selectAccount).toHaveBeenCalled()
  })
})
