import React from 'react'
import { mount } from 'enzyme'
import ReviewAndSubmit, { ReviewAndSubmit as ReviewAndSubmitComponent } from '..'
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

describe('ReviewAndSubmit component testing', () => {
  let wrapper: WrapperType
  let component: ReviewAndSubmitComponent
  const props: any = {
    data: {
      fromAccount: 'string',
      fromAccountNumber: 'string',
      toAccount: 'string',
      toAccountNumber: 'string',
      transferDate: '2012-12-12',
      transferAmount: 'string',
      fromAccountReference: 'string',
    },
    individualBusiness: 'individual',
    clickBack: jest.fn(),
    clickUpdateData: jest.fn(),
    clickDelete: jest.fn(),
    clickMakeTransfer: jest.fn(),
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <ReviewAndSubmit {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(ReviewAndSubmitComponent).instance() as ReviewAndSubmitComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should call `clickMakeTransfer` when clicking `Make transfer` button', async () => {
    props.data.transferDate = null
    props.individualBusiness = 'business'
    wrapper = mount(
      <AppContainer>
        <ReviewAndSubmit {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    wrapper.find(BaseTextLinkButton).last().props().onClick()
    expect(props.clickMakeTransfer).toHaveBeenCalled()
  })

  it('Should call `clickUpdateData` when clicking `Update Data` button', async () => {
    wrapper = mount(
      <AppContainer>
        <ReviewAndSubmit {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    wrapper.find(BaseTextLinkButton).first().props().onClick()
    expect(props.clickUpdateData).toHaveBeenCalled()
  })

  it('Should prevent default when clicking delete button', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.red.links'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.clickDelete).toHaveBeenCalled()
  })

  it('Should prevent default when clicking left arrow', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-left-arrow'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.clickBack).toHaveBeenCalled()
  })
})
