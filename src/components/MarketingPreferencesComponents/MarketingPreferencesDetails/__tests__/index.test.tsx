import React from 'react'
import { mount } from 'enzyme'
import MarketingPreferencesDetails, {
  MarketingPreferencesDetails as MarketingPreferencesDetailsComponent,
} from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'
import MarketingPreferencesForm from '../../MarketingPreferencesForm'
import { ASF } from '../../../../common/Api/Services/ApiServiceFactory'

jest.mock('../../../../common/Api/Services/MarketPrefService', () => {
  return {}
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

describe('MarketingPreferencesDetails component testing', () => {
  let wrapper: WrapperType
  let component: MarketingPreferencesDetailsComponent
  let props: {
    t: any
    dataList: {
      lastUpdated: string
      formData: {
        title: string
        description: string
        checked: boolean
        greenText: string
        subChoices: {
          title: string
          checked: boolean
        }[]
      }[]
    }
  }

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
    wrapper = mount(
      <AppContainer>
        <MarketingPreferencesDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(MarketingPreferencesDetailsComponent)
      .instance() as MarketingPreferencesDetailsComponent
  })

  it('Should render without crashing', () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })
    ASF.getService = mockStaticFunction

    props = {
      t: (param: string) => {
        return param
      },
      dataList: {
        lastUpdated: '21 October 2018',
        formData: [
          {
            title: 'personalized_ads',
            description: 'offers_tailored',
            checked: true,
            greenText: '',
            subChoices: [],
          },
          {
            title: 'non_personalized_ads',
            description: 'from_the_bank',
            checked: false,
            greenText: '',
            subChoices: [],
          },
          {
            title: 'other_marketing',
            description: 'reward_information',
            checked: true,
            greenText: 'Text',
            subChoices: [
              {
                title: 'Email',
                checked: false,
              },
              {
                title: 'Text',
                checked: true,
              },
              {
                title: 'Telephone',
                checked: false,
              },
              {
                title: 'Post',
                checked: false,
              },
            ],
          },
        ],
      },
    }
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should render without crashing when not null', () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getPreferences: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })
    ASF.getService = mockStaticFunction

    props = {
      t: (param: string) => {
        return param
      },
      dataList: {
        lastUpdated: '21 October 2018',
        formData: [
          {
            title: 'personalized_ads',
            description: 'offers_tailored',
            checked: true,
            greenText: '',
            subChoices: [],
          },
          {
            title: 'non_personalized_ads',
            description: 'from_the_bank',
            checked: false,
            greenText: '',
            subChoices: [],
          },
          {
            title: 'other_marketing',
            description: 'reward_information',
            checked: true,
            greenText: 'Text',
            subChoices: [
              {
                title: 'Email',
                checked: false,
              },
              {
                title: 'Text',
                checked: true,
              },
              {
                title: 'Telephone',
                checked: false,
              },
              {
                title: 'Post',
                checked: false,
              },
            ],
          },
        ],
      },
    }
    wrapper = mount(
      <AppContainer>
        <MarketingPreferencesDetails {...props} />
      </AppContainer>
    )
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
    // make sure component is rendered
    expect(wrapper.find(MarketingPreferencesForm).length).toBe(1)
  })
})
