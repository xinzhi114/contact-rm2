import React from 'react'
import { mount } from 'enzyme'
import SuccessTransferModalWindow, {
  SuccessTransferModalWindow as SuccessTransferModalWindowComponent,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../../test/helper'
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

describe('SuccessTransferModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: SuccessTransferModalWindowComponent
  let props: any = {
    data: {
      fromAccount: 'string',
      toAccount: 'string',
      switchActive: true,
      transferDate: new Date(),
      transferAmount: 'string',
      fromAccountReference: 'string',
      frequency: 'string',
      endDate: new Date(),
    },
    onApply: jest.fn(),
    onClose: jest.fn(),
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <SuccessTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(SuccessTransferModalWindowComponent)
      .instance() as SuccessTransferModalWindowComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking close button', async () => {
    props = {
      data: {
        fromAccount: 'string',
        toAccount: 'string',
        switchActive: false,
        transferDate: null,
        transferAmount: 'string',
        fromAccountReference: 'string',
        frequency: 'string',
        endDate: new Date(),
      },
      onApply: jest.fn(),
      onClose: jest.fn(),
      individualBusiness: 'individual',
    }
    wrapper = mount(
      <AppContainer>
        <SuccessTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should prevent default when clicking `Setup recurring transfer` button', async () => {
    props.onSetupRecurringTransfer = jest.fn()
    const event = { preventDefault: jest.fn() }
    wrapper = mount(
      <AppContainer>
        <SuccessTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    wrapper.find(BaseTextLinkButton).last().props().onClick(event)
    expect(props.onSetupRecurringTransfer).toHaveBeenCalled()
    expect(event.preventDefault).toHaveBeenCalled()
  })
})
