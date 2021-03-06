import React from 'react'
import { mount } from 'enzyme'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'
import MovePaymentHome, { MovePaymentHome as MovePaymentHomePage } from '..'
import DashboardLeftSidebar from '../../../../components/DashboardLeftSidebar'

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

describe('MovePaymentHomePage component testing', () => {
  let wrapper: WrapperType
  let component: MovePaymentHomePage

  beforeEach(async () => {
    beforeEachHelper()
    const props = {
      dataList: {},
    }
    wrapper = mount(
      <AppContainer>
        <MovePaymentHome {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(MovePaymentHomePage).instance() as MovePaymentHomePage
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should remove dashboard class when unmoute', () => {
    component.componentWillUnmount()
    const element = document.getElementById('root')
    if (element) {
      expect(element.className).not.toContain('dashboard')
    }
  })

  it('Should only change individual business if it is individual or business', async () => {
    component.setState({
      individualBusiness: '',
    })
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('notfound')
    await nextScreen(wrapper)
    expect(component.state.individualBusiness).toBeFalsy()
  })
})
