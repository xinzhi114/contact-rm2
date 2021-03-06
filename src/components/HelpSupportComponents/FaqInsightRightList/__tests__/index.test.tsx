import React from 'react'
import { mount } from 'enzyme'
import FaqInsightRightList, {
  FaqInsightRightList as FaqInsightRightListComponent,
  IFaqInsightRightListProps,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
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

describe('FaqInsightRightList component testing', () => {
  let wrapper: WrapperType
  let component: FaqInsightRightListComponent
  let props: IFaqInsightRightListProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      faq: Array.from(Array(10).keys()).map(() => ({
        name: 'Test',
        label: '',
        q: '',
        description: '',
      })),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <FaqInsightRightList {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(FaqInsightRightListComponent)
      .instance() as FaqInsightRightListComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when click `Show More`', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.green-link'), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(component.state.isShownMore).toBeTruthy()
  })

  it('Should prevent default when click arrow', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.expend-title.flex-grid').at(0), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(component.state.expanded[0]).toBeTruthy()
  })
})
