import React from 'react'
import { mount } from 'enzyme'
import InitiateAccountClosureModalWindow, {
  IInitiateAccountClosureModalWindowProps,
  InitiateAccountClosureModalWindow as InitiateAccountClosureModalWindowComponent,
} from '../index'
import { Dropdown } from 'react-bootstrap'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onChange,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
import _ from 'lodash'
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

const mockProps = {
  reasonDropdownOptions: ['string'],
  productForAutoClosure: [
    {
      title: 'string',
      category: 'string',
    },
  ],
  t: (param: string) => {
    return param
  },
}
describe('InitiateAccountClosureModalWindow component testing', () => {
  let wrapper: WrapperType
  let component: InitiateAccountClosureModalWindowComponent
  let props: IInitiateAccountClosureModalWindowProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      ..._.cloneDeep(mockProps),
      onApply: jest.fn(),
      onClose: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <InitiateAccountClosureModalWindow {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(InitiateAccountClosureModalWindowComponent)
      .instance() as InitiateAccountClosureModalWindowComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should handle input change', async () => {
    component.setState({
      reasonSelection: 'Other',
    })
    await nextScreen(wrapper)

    onChange(wrapper.find('.textareas textarea'), {
      target: {
        value: 10,
      },
    })
    await nextScreen(wrapper)
    expect(component.state.specifyReason).toEqual('10')
  })

  it('Should update reason selection when change dropdown value', async () => {
    const onSelect = wrapper.find(Dropdown).props().onSelect
    if (onSelect) {
      onSelect('reasonSelection', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    expect(component.state.reasonSelection).toBeTruthy()
  })

  it('Should prevent default when clicking blue txt', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.blue-txt').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking icon question', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-question').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should call on apply when clicking btn green', async () => {
    wrapper.find(BaseTextLinkButton).at(0).props().onClick()
    expect(props.onApply).toHaveBeenCalled()
  })

  it('Should call on close when clicking green link button', async () => {
    wrapper.find(BaseTextLinkButton).at(1).props().onClick()
    expect(props.onClose).toHaveBeenCalled()
  })
})
