import React from 'react'
import { mount } from 'enzyme'
import TransactionHistoryFiltersModalWindow, {
  TransactionHistoryFiltersModalWindow as TransactionHistoryFiltersModalWindowComponent,
} from '../index'
import DatePicker from 'react-datepicker'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onChange,
  onClick,
  getMouseEventDefault,
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

describe('TransactionHistoryFiltersModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: TransactionHistoryFiltersModalWindowComponent
  let props: {
    onApply: jest.Mock
    onClose: jest.Mock
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      onApply: jest.fn(),
      onClose: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <TransactionHistoryFiltersModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(TransactionHistoryFiltersModalWindowComponent)
      .instance() as TransactionHistoryFiltersModalWindowComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should handle check change', async () => {
    const checkItem = async (
      fieldName:
        | 'debitsCheck'
        | 'creditsCheck'
        | 'chequesClearedUnclearedCheck'
        | 'interestEarnedCheck',
      indexOfField: number
    ) => {
      onChange(wrapper.find('.checkbox-wrap input').at(indexOfField), {
        target: {
          checked: true,
        },
      })
      await nextScreen(wrapper)
      expect(component.state[fieldName]).toBeTruthy()
    }

    await checkItem('debitsCheck', 0)
    await checkItem('creditsCheck', 1)
    await checkItem('chequesClearedUnclearedCheck', 2)
    await checkItem('interestEarnedCheck', 3)
  })

  it('Should handle input change', async () => {
    const checkItem = async (indexOfField: number) => {
      onChange(wrapper.find('.radio-wrap input').at(indexOfField), {
        target: {
          value: 100,
        },
      })
      await nextScreen(wrapper)
      expect(component.state.transactionForRadio).toBeTruthy()
    }

    await checkItem(0)
    await checkItem(1)
    await checkItem(2)
    await checkItem(3)
  })

  it('Should apply when clicking apply button', async () => {
    onClick(wrapper.find('.bottom-btns a'))
    expect(props.onApply).toHaveBeenCalled()
  })

  it('Should handle date change', async () => {
    wrapper.find(DatePicker).props().onChange(new Date(2011, 1, 1), getMouseEventDefault())
    await nextScreen(wrapper)
    expect(component.state.specificDateInput).toBeTruthy()
  })

  it('Should close when clicking close button', async () => {
    onClick(wrapper.find('a.btn-close'))
    expect(props.onClose).toHaveBeenCalled()
  })
})
