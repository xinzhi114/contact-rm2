import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import AccountInformationModalWindow from '..'
import { getMouseEventDefault, onClick } from '../../../../../test/helper'

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

describe('AccountInformationModalWindow component testing', () => {
  it('Should render without crashing', () => {
    const props = {
      onClose: jest.fn(),
      dataList: [
        {
          fieldName: 'ACCOUNT NUMBER',
          fieldValue: '10875235',
        },
        {
          fieldName: 'ISSUE NUMBER',
          fieldValue: 'INO255687748',
        },
      ],
    }
    const wrapper = mount(
      <BrowserRouter>
        <AccountInformationModalWindow {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking close button', async () => {
    const props = {
      onClose: jest.fn(),
      dataList: [
        {
          fieldName: 'ACCOUNT NUMBER',
          fieldValue: '10875235',
        },
        {
          fieldName: 'ISSUE NUMBER',
          fieldValue: 'INO255687748',
        },
      ],
    }
    const wrapper = mount(
      <BrowserRouter>
        <AccountInformationModalWindow {...props} />
      </BrowserRouter>
    )

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })
})
