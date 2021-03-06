import React from 'react'
import { mount } from 'enzyme'
import ContactBankCallDetails, {
  ContactBankCallDetails as ContactBankCallDetailsComponent,
} from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'

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

describe('ContactBankCallDetails component testing', () => {
  let wrapper: WrapperType
  let component: ContactBankCallDetailsComponent
  let props

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      dataList: [
        {
          contactTitle: 'Contact Number for UK Caller',
          telephone: '0345 850 5555',
          availablityTime: '9.15am – 5.15pm (Monday - Friday)',
        },
        {
          contactTitle: 'Contact Number for non-UK Caller',
          telephone: '+44 (0) 20 3375 6422',
          availablityTime: '9.15am – 5.15pm (Monday - Friday)',
        },
      ],
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <ContactBankCallDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(ContactBankCallDetailsComponent)
      .instance() as ContactBankCallDetailsComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
