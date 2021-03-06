import React from 'react'
import { mount } from 'enzyme'
import { LoginHelpModalWindow } from '../index'
import { act } from 'react-dom/test-utils'

beforeAll(() => {
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
})

describe('login help modal window testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const props = {
        title: 'login help',
        videoId: 'id',
        onClose: jest.fn(),
        t: (param: string) => {
          return param
        },
      }
      const wrapper = mount(<LoginHelpModalWindow {...props} />)
      expect(wrapper).not.toEqual(undefined)
      // test the title rendered
      expect(wrapper.find('.left-txt').text()).toEqual('common.loginHelpModalWindow.login help')

      wrapper.find('.icons.icon-close').simulate('click')
      // tests whether close button is clicked
      expect(props.onClose).toHaveBeenCalled()
    })
  })
})
