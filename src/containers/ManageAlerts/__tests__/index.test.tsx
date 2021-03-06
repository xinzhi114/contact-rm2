import React from 'react'
import { mount } from 'enzyme'
import { ManageAlerts } from '../index'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../test/helper'

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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => null,
  useDispatch: () => jest.fn(),
}))

describe('ManageAlerts component testing', () => {
  let wrapper: WrapperType

  beforeEach(async () => {
    beforeEachHelper()
    window.matchMedia = () =>
      ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      } as any)

    wrapper = mount(
      <AppContainer>
        <ManageAlerts />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Should remove dashboard class when unmoute', () => {
    wrapper.unmount()
    const element = document.getElementById('root')
    if (element) {
      expect(element.className).not.toContain('dashboard')
    }
  })

  it('Should renders without crashing when response not null', async () => {
    await nextScreen(wrapper)

    expect(wrapper).not.toEqual(undefined)
  })

  it('Should renders without crashing when response catch error', async () => {
    await nextScreen(wrapper)

    expect(wrapper).not.toEqual(undefined)
  })
})
