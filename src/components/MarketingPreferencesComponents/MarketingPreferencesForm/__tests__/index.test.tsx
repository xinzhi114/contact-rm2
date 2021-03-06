import React from 'react'
import { mount } from 'enzyme'
import MarketingPreferencesForm, {
  MarketingPreferencesForm as MarketingPreferencesFormComponent,
} from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'
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

describe('MarketingPreferencesForm component testing', () => {
  let wrapper: WrapperType
  let component: MarketingPreferencesFormComponent
  let props: any

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
      formType: 'page',
      dataList: [
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
      mockupHasLastUpdate: 'test',
    }
    wrapper = mount(
      <AppContainer>
        <MarketingPreferencesForm {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(MarketingPreferencesFormComponent)
      .instance() as MarketingPreferencesFormComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
