import React from 'react'
import { mount } from 'enzyme'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../test/helper'
import BaseForm from '../index'
import { IBaseFormFields, IBaseFormProps } from '../../../constants/baseForm'

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

describe('TransactionHistoryDownloadModalWindow component testing', () => {
  let wrapper: WrapperType
  let props: IBaseFormProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      fields: {},
    }
    wrapper = mount(
      <AppContainer>
        <BaseForm {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should renders without crashing when wrapperClassName present', async () => {
    const fields: IBaseFormFields = {
      data: { type: 'text', value: '', wrapperClassName: '' },
      data1: { type: 'text', value: '', wrapperClassName: 'test' },
    }
    props = {
      fields,
    }
    wrapper = mount(
      <AppContainer>
        <BaseForm {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })
})
