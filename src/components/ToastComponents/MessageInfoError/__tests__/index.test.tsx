import React from 'react'
import { mount } from 'enzyme'
import MessageInfo from '../index'
import { act } from 'react-dom/test-utils'

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

describe('Message Info component testing', () => {
  it('Should render correctly without crashing', async () => {
    const props = {
      messageText: 'Your passcode has been successfully changed',
      onRetry: jest.fn(),
      t: jest.fn(),
    }
    await act(async () => {
      const wrapper = mount(
        // @ts-ignore
        <MessageInfo {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should show the correct reset message', async () => {
    await act(async () => {
      const props = {
        messageText: 'Your passcode has been successfully changed',
        onRetry: jest.fn(),
        t: jest.fn(),
      }

      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.dynamicLabels.Your passcode has been successfully changed'
      )
    })
  })

  it('Should show the correct new user message', async () => {
    await act(async () => {
      const props = {
        messageText: 'Your User ID and passcode has been successfully created.',
        onRetry: jest.fn(),
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.dynamicLabels.Your User ID and passcode has been successfully created.'
      )
    })
  })

  it('Should dismiss when close button is clicked', async () => {
    await act(async () => {
      let props: any = {
        messageText: 'showNewUserMessage',
        t: jest.fn(),
      }
      let wrapper = mount(<MessageInfo {...props} />)
      wrapper.find('.white-link').simulate('click')

      props = {
        messageText: 'showNewUserMessage',
        onRetry: jest.fn(),
        t: jest.fn(),
      }
      wrapper = mount(<MessageInfo {...props} />)
      wrapper.find('.white-link').simulate('click')
      expect(props.onRetry).toHaveBeenCalled()
    })
  })
})
