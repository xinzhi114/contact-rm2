import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { AlertsBannerTop, AlertsBannerTop as AlertsBannerBottomComponent } from '../index'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../../test/helper'
import { defaultState as mockDefaultState } from '../../../../store/reducers/alerts'

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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: (selector: any) => selector({ alerts: mockDefaultState }),
}))

describe('AlertsBannerTop component testing', () => {
  let wrapper: WrapperType
  let component: ReactWrapper
  const createWrapper = async (extraProps = {}) => {
    const props: any = {
      dataList: {},
      ...extraProps,
    }

    window.matchMedia = () =>
      ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      } as any)

    wrapper = mount(
      <AppContainer>
        <AlertsBannerTop {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(AlertsBannerBottomComponent)
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should renders ui when account alert enabled', async () => {
    await createWrapper({})
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').length).toBeTruthy()
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').at(0).text()).toContain(
      'manageAlerts.alertsBannerTop.view_history'
    )
  })

  it('Should renders ui when payment alert enabled', async () => {
    await createWrapper({})
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').length).toBeTruthy()
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').at(1).text()).toContain(
      'manageAlerts.alertsBannerTop.view_history'
    )
  })

  it('Should renders ui when alert history enabled', async () => {
    await createWrapper({})
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').length).toBeTruthy()
    expect(wrapper.find('.btn.btn-gray.btn-blue-border').at(2).text()).toContain(
      'manageAlerts.alertsBannerTop.view_history'
    )
  })
})
