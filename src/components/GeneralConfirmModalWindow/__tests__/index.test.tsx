import React from 'react'
import { mount } from 'enzyme'
import GeneralConfirmModalWindow from '..'
import { BrowserRouter } from 'react-router-dom'
import { getMouseEventDefault, onClick } from '../../../test/helper'
import { BaseTextLinkButton } from '../../BaseForm/BaseFormFields/BaseTextLinkButton'

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

describe('GeneralConfirmModalWindow testing', () => {
  it('Should render correctly without crashing', async () => {
    const props = {
      titleText: 'string',
      messageText: 'string',
      confirmBtnText: 'string',
      href: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <GeneralConfirmModalWindow {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking close button', async () => {
    const props = {
      titleText: 'string',
      messageText: 'string',
      confirmBtnText: 'string',
      href: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <GeneralConfirmModalWindow {...props} />
      </BrowserRouter>
    )

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call `onClose` when confirm click', async () => {
    const props = {
      titleText: 'string',
      messageText: 'string',
      confirmBtnText: 'string',
      href: 'string',
      onClose: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <GeneralConfirmModalWindow {...props} />
      </BrowserRouter>
    )

    // click update button
    wrapper.find(BaseTextLinkButton).props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })
})
