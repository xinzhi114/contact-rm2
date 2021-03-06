import React from 'react'
import { mount } from 'enzyme'
import TransactionHistoryDownloadModalWindow, {
  TransactionHistoryDownloadModalWindow as TransactionHistoryDownloadModalWindowComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
} from '../../../../test/helper'

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

describe('TransactionHistoryDownloadModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: TransactionHistoryDownloadModalWindowComponent
  let props: {
    onApply: jest.Mock
    onClose: jest.Mock
    t: any
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      onApply: jest.fn(),
      onClose: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <TransactionHistoryDownloadModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(TransactionHistoryDownloadModalWindowComponent)
      .instance() as TransactionHistoryDownloadModalWindowComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should set selected file type', async () => {
    const checkItem = async (fileType: string, indexOfField: number) => {
      onClick(wrapper.find('.four-boxs a').at(indexOfField))
      await nextScreen(wrapper)
      expect(component.state.selectedFiltType).toEqual(fileType)
    }

    await checkItem('PDF', 0)
    await checkItem('CSV', 1)
    await checkItem('QuickBook', 2)
    await checkItem('Xero', 3)
    await checkItem('Intuit', 4)
  })

  it('Should apply when clicking apply button', async () => {
    onClick(wrapper.find('.bottom-btns a'))
    expect(props.onApply).toHaveBeenCalled()
  })

  it('Should close when clicking close button', async () => {
    onClick(wrapper.find('a.btn-close'))
    expect(props.onClose).toHaveBeenCalled()
  })
})
