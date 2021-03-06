import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { EmailActionsBar } from '..'
import { getMouseEventDefault, onClick } from '../../../../test/helper'

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

describe('EmailActionsBar testing', () => {
  it('Should render correctly without crashing', async () => {
    const props = {
      emailActions: [
        {
          iconName: 'green-unread',
          menuLabel: 'mark_as_unread',
        },
        {
          iconName: 'green-trash',
          menuLabel: 'trash',
        },
      ],
    }
    const wrapper = mount(
      <BrowserRouter>
        <EmailActionsBar {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking button', async () => {
    const props = {
      emailActions: [
        {
          iconName: 'green-unread',
          menuLabel: 'mark_as_unread',
        },
        {
          iconName: 'green-trash',
          menuLabel: 'trash',
        },
      ],
    }
    const wrapper = mount(
      <BrowserRouter>
        <EmailActionsBar {...props} />
      </BrowserRouter>
    )
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icon-btn').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
