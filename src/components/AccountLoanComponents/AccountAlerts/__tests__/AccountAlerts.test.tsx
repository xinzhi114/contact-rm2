import React from 'react'
import { mount } from 'enzyme'
import AccountAlerts from '../index'
import { AppContainer } from '../../../../test/helper'
import { BaseTextLinkButton } from '../../../BaseForm/BaseFormFields/BaseTextLinkButton'
import ReinvestTotalPartialAmountModalWindow from '../../AccountAlertsModalsComponents/ReinvestTotalPartialAmountModalWindow'

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

describe('InnerLoading component', () => {
  it('Should render without crashing', async () => {
    const props = {
      closeAccountAlerts: jest.fn(),
      accountName: 'Account1',
      dataList: ['Account1', 'Account2'],
    }

    const wrapper = mount(
      <AppContainer>
        <AccountAlerts {...props} />
      </AppContainer>
    )
    expect(wrapper.length).toBe(1)
    expect(wrapper).toBeDefined()
  })

  it('Should prevent default when clicking `Pay at maturity`', async () => {
    const props = {
      closeAccountAlerts: jest.fn(),
      accountName: 'Account1',
      dataList: ['Account1', 'Account2'],
    }
    const wrapper = mount(<AccountAlerts {...props} />)
    wrapper.find(BaseTextLinkButton).at(0).props().onClick()
    wrapper.update()
    expect(wrapper.find('.hide').length).toBe(1)
  })

  it('Should prevent default when clicking `Reinvest total`', async () => {
    const props = {
      closeAccountAlerts: jest.fn(),
      accountName: 'Account1',
      dataList: ['Account1', 'Account2'],
    }
    const wrapper = mount(<AccountAlerts {...props} />)
    wrapper.find(BaseTextLinkButton).at(1).props().onClick()
    wrapper.update()
    expect(wrapper.find(ReinvestTotalPartialAmountModalWindow).length).toBe(1)
  })

  it('Should prevent default when clicking `Reinvest partial`', async () => {
    const props = {
      closeAccountAlerts: jest.fn(),
      accountName: 'Account1',
      dataList: ['Account1', 'Account2'],
    }
    const wrapper = mount(<AccountAlerts {...props} />)
    wrapper.find(BaseTextLinkButton).at(2).props().onClick()
    wrapper.update()
    expect(wrapper.find(ReinvestTotalPartialAmountModalWindow).length).toBe(1)
  })
})
