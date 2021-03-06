import React from 'react'
import { mount } from 'enzyme'
import { AccountAlertsDetails, IAccountAlertsDetailsProps } from '../index'
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

describe('AccountAlertsDetails component testing', () => {
  let wrapper: WrapperType

  beforeEach(async () => {
    beforeEachHelper()
    const props: IAccountAlertsDetailsProps = {
      currentIndex: 0,
      dataList: [
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
    }
    wrapper = mount(
      <AppContainer>
        <AccountAlertsDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })
})
