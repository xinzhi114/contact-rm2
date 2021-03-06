import React from 'react'
import { mount } from 'enzyme'
import UpdateTransferModalWindow, {
  UpdateTransferModalWindow as UpdateTransferModalWindowComponent,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../../test/helper'
import DatePicker from 'react-datepicker'
import { BaseTextLinkButton } from '../../../../BaseForm/BaseFormFields/BaseTextLinkButton'
import { BaseTextInput } from '../../../../BaseForm/BaseFormFields/BaseTextInput'

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

describe('UpdateTransferModalWindowComponent component testing', () => {
  let wrapper: WrapperType
  let component: UpdateTransferModalWindowComponent
  const props: any = {
    data: {
      fromAccount: 'Current account',
      toAccount: 'France expansion',
      switchActive: true,
      transferDate: new Date(),
      endDate: new Date(),
      transferAmount: '13',
      frequency: 'Weekly',
      fromAccountReference: '1234',
    },
    selectData: {
      fromAccountList: [
        {
          label: 'Current account',
          number: '9846 - 4754 - 7585',
          value: 'Current account',
          availableBalance: '120.650.00',
        },
        {
          label: 'Saving account',
          number: '9846 - 4754 - 7585',
          value: 'Saving account',
          availableBalance: '220.650.00',
        },
        {
          label: 'Other account',
          number: '9846 - 4754 - 7585',
          value: 'Other account',
          availableBalance: '320.650.00',
        },
      ],
      toAccountList: [
        {
          label: 'France expansion',
          value: 'France expansion',
          isActive: 'Account is Inactive',
        },
        {
          label: 'London suppliers',
          value: 'London suppliers',
          isActive: '',
        },
      ],
    },
    onApply: jest.fn(),
    onClose: jest.fn(),
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <UpdateTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(UpdateTransferModalWindowComponent)
      .instance() as UpdateTransferModalWindowComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking update button', async () => {
    props.data.switchActive = false
    wrapper = mount(
      <AppContainer>
        <UpdateTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // click update button
    wrapper.find(BaseTextLinkButton).props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })

  it('Should change state when change `From account reference`', async () => {
    // @ts-ignore
    wrapper
      .find(BaseTextInput)
      .last()
      .props()
      .onChange({ target: { validity: { valid: true }, value: '123456' } })
    await nextScreen(wrapper)

    expect(component.state.data.fromAccountReference).toEqual('123456')
  })

  it('Should change state when change `End Date`', async () => {
    props.data.switchActive = true
    wrapper = mount(
      <AppContainer>
        <UpdateTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const date = new Date(2012, 12, 12)
    // @ts-ignore
    wrapper.find(DatePicker).last().props().onChange(date)
    await nextScreen(wrapper)

    expect(component.state.data.transferDate).toEqual(date)
  })

  it('Should change state when change `Transfer amount`', async () => {
    // @ts-ignore
    wrapper
      .find(BaseTextInput)
      .first()
      .props()
      .onChange({ target: { validity: { valid: false } } })
    await nextScreen(wrapper)

    expect(component.state.data.transferAmount).toEqual('13')

    // @ts-ignore
    wrapper
      .find(BaseTextInput)
      .first()
      .props()
      .onChange({ target: { validity: { valid: true }, value: '133' } })
    await nextScreen(wrapper)

    expect(component.state.data.transferAmount).toEqual('133')
  })

  it('Should prevent default when clicking close button', async () => {
    props.individualBusiness = 'individual'
    wrapper = mount(
      <AppContainer>
        <UpdateTransferModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })
})
