import React from 'react'
import { mount } from 'enzyme'
import { PaymentAlertsDetails } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
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

describe('PaymentAlertsDetails component testing', () => {
  let wrapper: WrapperType

  beforeEach(async () => {
    beforeEachHelper()
    const props: any = {
      dataList: [
        {
          alertConfId: 13,
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
          alert: {
            alert: 'string',
            alertDescription: 'string',
            valueEditable: false,
            event: 'string',
          },
          updating: true,
          active: true,
          event: {
            event: 'string;',
            eventDescription: 'string;',
            valueEditable: true,
            active: true,
          },
        },
        {
          alertConfId: 13,
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
          alert: {
            alert: 'string',
            alertDescription: 'string',
            valueEditable: false,
            event: 'string',
          },
          updating: true,
          active: true,
          event: {
            event: 'string;',
            eventDescription: 'string;',
            valueEditable: true,
            active: true,
          },
        },
      ],
      onUpdated: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <PaymentAlertsDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Should enable data list when check checkbox', async () => {
    onClick(wrapper.find('.check-round-wrap input').at(0))
  })
})
