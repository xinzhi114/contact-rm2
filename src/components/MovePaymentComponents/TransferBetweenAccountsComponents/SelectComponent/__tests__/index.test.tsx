import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import SelectComponent from '..'
import { Dropdown } from 'react-bootstrap'

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

describe('Message Info component testing', () => {
  it('Should render correctly without crashing', async () => {
    await act(async () => {
      const props = {
        data: undefined,
        callBack: jest.fn(),
        label: 'label',
        defaultValue: '',
        t: jest.fn(),
        id: 'dropdown-basic-select',
      }
      const wrapper = mount(
        // @ts-ignore
        <SelectComponent {...props} />
      )
      expect(wrapper).not.toEqual(undefined)
    })
  })

  it('Should set selected and call function on dropdown change', async () => {
    const props = {
      data: [
        {
          label: 'string',
          number: 'string',
          value: 'string',
        },
      ],
      callBack: jest.fn(),
      label: 'label',
      defaultValue: '',
      t: jest.fn(),
      id: 'dropdown-basic-select',
    }
    const wrapper = mount(
      // @ts-ignore
      <SelectComponent {...props} />
    )
    // @ts-ignore
    wrapper.find(Dropdown).props().onSelect(null)
    expect(props.callBack).toHaveBeenCalled()
  })
})
