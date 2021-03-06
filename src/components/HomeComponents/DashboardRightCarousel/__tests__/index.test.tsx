import React from 'react'
import { mount } from 'enzyme'
import DashboardRightCarousel, {
  DashboardRightCarousel as DashboardRightCarouselComponent,
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

describe('DashboardRightCarousel component testing', () => {
  let wrapper: WrapperType
  let component: DashboardRightCarouselComponent
  const props = {
    clickApplyNow: jest.fn(),
    t: (param: string) => {
      return param
    },
  }

  beforeEach(async () => {
    beforeEachHelper()
    wrapper = mount(
      <AppContainer>
        <DashboardRightCarousel {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(DashboardRightCarouselComponent)
      .instance() as DashboardRightCarouselComponent
  })

  it('Should render without crashing', async () => {
    component.setState({ isOpend: false })
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when clicking `Apply now`', async () => {
    wrapper = mount(
      <AppContainer>
        <DashboardRightCarousel {...props} />
      </AppContainer>
    )
    jest.advanceTimersByTime(5000)
    component.setState({ currentIndex: 0 })
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn.btn-white').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.clickApplyNow).toHaveBeenCalled()

    component.setState({ currentIndex: 1 })
    await nextScreen(wrapper)
    onClick(wrapper.find('.btn.btn-white').at(1), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()

    component.setState({ currentIndex: 2 })
    await nextScreen(wrapper)
    onClick(wrapper.find('.btn.btn-white').at(2), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()

    component.setState({ currentIndex: 3 })
    await nextScreen(wrapper)
    onClick(wrapper.find('.btn.btn-white').at(3), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when clicking list item', async () => {
    wrapper = mount(
      <AppContainer>
        <DashboardRightCarousel {...props} />
      </AppContainer>
    )
    jest.advanceTimersByTime(5000)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.points').at(0), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(component.state.currentIndex).toBe(3)
  })
})
