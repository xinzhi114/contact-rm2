import React from 'react'
import { mount } from 'enzyme'
import SelectFAQCategory, {
  ISelectFAQCategoryProps,
  SelectFAQCategory as SelectFAQCategoryComponent,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
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

describe('SelectFAQCategory component testing', () => {
  let wrapper: WrapperType
  let component: SelectFAQCategoryComponent
  const props: ISelectFAQCategoryProps = {
    currentIndex: 0,
    faq: [
      {
        name: 'Test',
        label: '',
        q: '',
        description: '',
      },
      {
        name: 'Payment alerts',
        label: '',
        q: '',
        description: '',
      },
    ],
    clickContactUs: jest.fn(),
    selectTab: jest.fn(),
    t: (param: string) => {
      return param
    },
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <SelectFAQCategory {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(SelectFAQCategoryComponent).instance() as SelectFAQCategoryComponent
  })

  it('Should render without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking `Contact Us`', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn.btn-green'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.clickContactUs).toHaveBeenCalled()
  })

  it('Should prevent default when clicking name', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
  })

  it('Should change state when change dropdown value', async () => {
    // @ts-ignore
    wrapper.find(Dropdown).props().onSelect('Payment alerts')
    await nextScreen(wrapper)
    expect(component.state.tabSelection).toBe('Payment alerts')
    expect(props.selectTab).toHaveBeenCalledWith(1)
  })
})
