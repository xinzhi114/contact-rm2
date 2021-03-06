import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import ProfileSelectCategory from '..'
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

describe('ProfileSelectCategory component testing', () => {
  it('Should renders without crashing', () => {
    const props = {
      currentIndex: 0,
      tabArray: ['Account Aggregation', 'Income & Outgoings', 'Spending', 'Budgeting'],
      selectCategory: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ProfileSelectCategory {...props} />
      </BrowserRouter>
    )
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when clicking tab', async () => {
    const props = {
      currentIndex: 0,
      tabArray: ['Account Aggregation', 'Income & Outgoings', 'Spending', 'Budgeting'],
      selectCategory: jest.fn(),
    }
    const wrapper = mount(
      <BrowserRouter>
        <ProfileSelectCategory {...props} />
      </BrowserRouter>
    )
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar.current'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectCategory).toHaveBeenCalled()
  })
})
