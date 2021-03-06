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

describe('Message Info component testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const props = {
        messageType: 'showResetMessage',
        t: jest.fn(),
      }
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
        messageType: 'showResetMessage',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.messageInfo.your_passcode_successfully_changed.'
      )
    })
  })

  it('Should show the correct new user message', async () => {
    await act(async () => {
      const props = {
        messageType: 'showNewUserMessage',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.messageInfo.your_user_id_successfully_created.'
      )
    })
  })

  it('Should show the correct show account closure message', async () => {
    await act(async () => {
      const props = {
        messageType: 'showAccountClosureMessage',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.messageInfo.your_account_closure_sent_successfully.'
      )
    })
  })

  it('Should show the correct show request consolidated 7 years success message', async () => {
    await act(async () => {
      const props = {
        messageType: 'showRequestConsolidated7YearSuccessMessage',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.messageInfo.request_consolidated_7_year_eStatement_submitted.'
      )
    })
  })

  it('Should show the correct show request current tax year success message', async () => {
    await act(async () => {
      const props = {
        messageType: 'showRequestCurrentTaxYearSuccessMessage',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(
        'common.messageInfo.request_current_tax_year_submitted.'
      )
    })
  })

  it('Should show the correct show react native success message', async () => {
    await act(async () => {
      const props = {
        messageType: 'showReactNativeSuccess',
        t: jest.fn(),
      }
      const wrapper = mount(<MessageInfo {...props} />)
      expect(wrapper.find('.txt').text()).toEqual(' common.messageInfo.has_been_moved_to ')
    })
  })

  it('Should dismiss when close button is clicked', async () => {
    await act(async () => {
      let props: any = {
        messageType: 'showNewUserMessage',
        onDismiss: jest.fn(),
        t: jest.fn(),
      }
      let wrapper = mount(<MessageInfo {...props} />)
      wrapper.find('.green-link').simulate('click')
      expect(props.onDismiss).toHaveBeenCalled()

      props = {
        messageType: 'showNewUserMessage',
        t: jest.fn(),
      }
      wrapper = mount(<MessageInfo {...props} />)
      wrapper.find('.green-link').simulate('click')
    })
  })
})
