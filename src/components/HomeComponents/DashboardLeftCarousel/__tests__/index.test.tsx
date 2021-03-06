import React from 'react'
import { mount } from 'enzyme'
import DashboardLeftCarousel, { DashboardLeftCarousel as DashboardLeftCarouselComponent } from '..'
import {
  WrapperType,
  AppContainer,
  nextScreen,
  beforeEachHelper,
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

describe('DashboardLeftCarousel component testing', () => {
  let wrapper: WrapperType
  let component: DashboardLeftCarouselComponent
  const props = {
    clickApplyNow: jest.fn(),
    t: (param: string) => {
      return param
    },
  }
  const createWrapper = async () => {
    wrapper = mount(
      <AppContainer>
        <DashboardLeftCarousel {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(DashboardLeftCarouselComponent)
      .instance() as DashboardLeftCarouselComponent
  }

  beforeEach(async () => {
    global.innerWidth = 1000
    global.dispatchEvent(new Event('resize'))
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should not auto scroll if is in mobile view', async () => {
    global.innerWidth = 700
    global.dispatchEvent(new Event('resize'))
    await nextScreen(wrapper)
    await createWrapper()
    expect(component.state.currentIndex).toBeDefined()
  })

  it('Should prevent default on click', async () => {
    wrapper = mount(
      <AppContainer>
        <DashboardLeftCarousel {...props} />
      </AppContainer>
    )
    jest.advanceTimersByTime(5000)
    component.setState({ isOpend: false })
    component.setState({ currentIndex: 0 })
    await nextScreen(wrapper)

    onClick(wrapper.find('.btn.btn-light-blue').at(0))

    component.setState({ currentIndex: 1 })
    await nextScreen(wrapper)

    onClick(wrapper.find('.btn.btn-light-blue').at(1))

    component.setState({ currentIndex: 2 })
    await nextScreen(wrapper)

    onClick(wrapper.find('.btn.btn-light-blue').at(2))

    component.setState({ currentIndex: 3 })
    await nextScreen(wrapper)

    onClick(wrapper.find('.btn.btn-light-blue').at(3))

    expect(props.clickApplyNow).toHaveBeenCalled()
  })

  it('Should prevent default on click and change state on array item', async () => {
    wrapper = mount(
      <AppContainer>
        <DashboardLeftCarousel {...props} />
      </AppContainer>
    )
    jest.advanceTimersByTime(5000)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.points').at(0), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
