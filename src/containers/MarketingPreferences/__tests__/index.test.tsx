import React from 'react'
import { mount } from 'enzyme'
import {
  MarketingPreferences,
  IMarketingPreferencesProps,
  MarketingPreferences as MarketingPreferencesComponent,
} from '..'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../test/helper'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'

jest.mock('../../../common/Api/Services/EventSubscriptionFiltrationService', () => {
  return {}
})

jest.mock('../../../store/actions/dataAction', () => {
  const result: any = {}
  const lodash = require('lodash')
  const testHelper = require('../../../test/helper')
  lodash.forEach(testHelper.dataActionMethods, (method: string) => {
    result[method] = jest.fn(() => jest.fn())
  })
  return result
})

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
jest.mock('../../../i18n', () => {
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

const mockProps = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

describe('MarketingPreferences component testing', () => {
  let wrapper: WrapperType
  let component: MarketingPreferencesComponent
  let props: IMarketingPreferencesProps

  beforeEach(async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })

    ASF.getService = mockStaticFunction

    beforeEachHelper()
    props = {
      t: (param: string) => {
        return param
      },
      history: mockProps.history,
      location: mockProps.location,
      match: mockProps.match,
    }
    wrapper = mount(
      <AppContainer>
        <MarketingPreferences {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(MarketingPreferencesComponent)
      .instance() as MarketingPreferencesComponent
  })

  it('Should renders without crashing', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <MarketingPreferences {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should remove dashboard class when unmoute', () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })

    ASF.getService = mockStaticFunction

    component.componentWillUnmount()
    const element = document.getElementById('root')
    if (element) {
      expect(element.className).not.toContain('dashboard')
    }
  })

  it('Should only change individual business if it is individual or business', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })

    ASF.getService = mockStaticFunction

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
