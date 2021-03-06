import React from 'react'
import { mount } from 'enzyme'
import AccountProfileMobile from '..'
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

describe('AccountProfileMobile component testing', () => {
  let wrapper: WrapperType
  let props: any

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      accountProfile: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
    }
    wrapper = mount(
      <AppContainer>
        <AccountProfileMobile {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking Voice call icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-item').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking Video call icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-item').at(1), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking Email icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-item').at(2), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking Appointment icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.link-item').at(3), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
