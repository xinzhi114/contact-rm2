import React from 'react'
import { mount } from 'enzyme'
import MarketingPreferencesModalWindow, {
  MarketingPreferencesModalWindow as MarketingPreferencesModalWindowPage,
} from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'

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

jest.mock('../../../../common/Api/Services/MarketPrefService', () => {
  return {}
})

describe('MarketingPreferencesModalWindowPage component testing', () => {
  const mockStaticFunction = jest.fn()
  mockStaticFunction.mockReturnValueOnce({
    getPreferences: () => {
      return new Promise((resolve, reject) => {
        reject('An Error')
      })
    },
  })

  ASF.getService = mockStaticFunction

  let wrapper: WrapperType
  let component: MarketingPreferencesModalWindowPage
  let props: any

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      onApply: jest.fn(),
      onClose: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <MarketingPreferencesModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(MarketingPreferencesModalWindowPage)
      .instance() as MarketingPreferencesModalWindowPage
  })

  it('Should renders without crashing', () => {
    jest.spyOn(Math, 'round').mockImplementation(() => 0)
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
