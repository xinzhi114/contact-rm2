import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import ReactivateISACheckModalWindow from '..'
import { BaseTextLinkButton } from '../../../../BaseForm/BaseFormFields/BaseTextLinkButton'

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
jest.mock('../../../../../i18n', () => {
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

describe('ReactivateISACheckModalWindow component testing', () => {
  it('Should render without crashing', () => {
    const props = {
      accountName: 'string',
      accountNumber: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ReactivateISACheckModalWindow {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should call `onClose` when close button click', () => {
    const props = {
      accountName: 'string',
      accountNumber: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ReactivateISACheckModalWindow {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find('.btn-close').props().onClick({ preventDefault: jest.fn() })
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call `onChange` when `BaseTextLinkButton` click', () => {
    const props = {
      accountName: 'string',
      accountNumber: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ReactivateISACheckModalWindow {...props} />
      </BrowserRouter>
    )
    // @ts-ignore
    wrapper.find(BaseTextLinkButton).props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })
})
