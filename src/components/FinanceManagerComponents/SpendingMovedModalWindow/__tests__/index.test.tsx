import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import SpendingMovedModalWindow from '..'
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

describe('Spending Moved Modal Window component testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const props = {
        t: (param: string) => {
          return param
        },
        extraText1: 'string',
        extraText2: 'string',
        onDismiss: jest.fn(),
      }
      const wrapper = mount(
        // @ts-ignore
        <SpendingMovedModalWindow {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should prevent default when clicking close image', async () => {
    const props = {
      t: (param: string) => {
        return param
      },
      extraText1: 'string',
      extraText2: 'string',
      onDismiss: jest.fn(),
    }
    const wrapper = mount(
      // @ts-ignore
      <SpendingMovedModalWindow {...props} />
    )
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.close-img'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onDismiss).toHaveBeenCalled()
  })

  it('Should prevent default when clicking dismiss', async () => {
    const props = {
      t: (param: string) => {
        return param
      },
      extraText1: 'string',
      extraText2: 'string',
      onDismiss: jest.fn(),
    }
    const wrapper = mount(
      // @ts-ignore
      <SpendingMovedModalWindow {...props} />
    )
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn.btn-green'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onDismiss).toHaveBeenCalled()
  })
})
