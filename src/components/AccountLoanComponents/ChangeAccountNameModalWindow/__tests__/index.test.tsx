import React from 'react'
import { mount } from 'enzyme'
import ChangeAccountNameModalWindow, {
  IChangeAccountNameModalWindowProps,
  ChangeAccountNameModalWindow as ChangeAccountNameModalWindowComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onChange,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'
import { BaseTextLinkButton } from '../../../BaseForm/BaseFormFields/BaseTextLinkButton'

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

describe('ChangeAccountNameModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: ChangeAccountNameModalWindowComponent
  let props: IChangeAccountNameModalWindowProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      accountName: 'string',
      onApply: jest.fn(),
      onClose: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <ChangeAccountNameModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(ChangeAccountNameModalWindowComponent)
      .instance() as ChangeAccountNameModalWindowComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should handle input change', async () => {
    onChange(wrapper.find('.date-boxs input'), {
      target: {
        value: 10,
      },
    })
    await nextScreen(wrapper)
    expect(component.state.accountName).toEqual('10')
  })

  it('Should clear input', async () => {
    onClick(wrapper.find('.icon-del'))
    await nextScreen(wrapper)
    expect(component.state.accountName).toBeFalsy()
  })

  it('Should prevent default when clicking icon question', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-question'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()
  })

  it('Should call on apply when clicking btn green', async () => {
    wrapper.find(BaseTextLinkButton).at(0).props().onClick()
    expect(props.onApply).toHaveBeenCalled()
  })

  it('Should call on close when clicking green link button', async () => {
    wrapper.find(BaseTextLinkButton).last().props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })
})
