import React from 'react'
import { mount } from 'enzyme'
import MostActiveAccounts, { MostActiveAccounts as MostActiveAccountsComponent } from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
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

describe('MostActiveAccounts component testing', () => {
  let wrapper: WrapperType
  let component: MostActiveAccountsComponent
  let props: {
    t: any
    dataList: {
      accountType: string
      accountNumber: string
      remainingBalance: string
      overdraft: string
    }[]
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      t: (param: string) => {
        return param
      },
      dataList: [
        {
          accountType: 'string',
          accountNumber: 'string',
          remainingBalance: '13',
          overdraft: '1',
        },
      ],
    }
    wrapper = mount(
      <AppContainer>
        <MostActiveAccounts {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(MostActiveAccountsComponent).instance() as MostActiveAccountsComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking question icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-question'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking `View More` link', async () => {
    component.setState({
      isOpend: false,
    })
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-view'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
