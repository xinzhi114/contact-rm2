import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import RequestClosureBusinessModalWindow from '..'
import { getMouseEventDefault, onClick } from '../../../../../test/helper'
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

describe('RequestClosureBusinessModalWindow component testing', () => {
  it('Should render without crashing', () => {
    const props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <RequestClosureBusinessModalWindow {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking close button', async () => {
    const props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <RequestClosureBusinessModalWindow {...props} />
      </BrowserRouter>
    )

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should call `onSubmit` when submit click', async () => {
    const props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <RequestClosureBusinessModalWindow {...props} />
      </BrowserRouter>
    )

    // click update button
    wrapper.find(BaseTextLinkButton).first().props().onClick()
    expect(props.onSubmit).toHaveBeenCalled()
  })

  it('Should call `onClose` when cancel click', async () => {
    const props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <RequestClosureBusinessModalWindow {...props} />
      </BrowserRouter>
    )

    const mouseEvent = getMouseEventDefault()

    // click update button
    wrapper.find(BaseTextLinkButton).last().props().onClick(mouseEvent)
    expect(props.onClose).toHaveBeenCalled()
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
