import React from 'react'
import { mount } from 'enzyme'
import { AppContainer, beforeEachHelper, nextScreen, WrapperType } from '../../../../test/helper'
import DashboardWelcome, { DashboardWelcome as DashboardWelcomeComponent } from '..'

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

describe('DashboardWelcome component testing', () => {
  let wrapper: WrapperType
  let component: DashboardWelcomeComponent
  let props: {
    dataList?: {
      loginTime: string
      loginIP: string
    }
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {}
    wrapper = mount(
      <AppContainer>
        <DashboardWelcome {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(DashboardWelcomeComponent).instance() as DashboardWelcomeComponent
  })

  it('Should render without crashing', () => {
    // @ts-ignore
    global.Date = MockDateOne
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should render without crashing for afternoon time', async () => {
    // @ts-ignore
    global.Date = MockDateTwo
    props = {
      dataList: {
        loginTime: '12 Oct 2020, 1:19:50 PM',
        loginIP: '185.86.151.11',
      },
    }
    wrapper = mount(
      <AppContainer>
        <DashboardWelcome {...props} />
      </AppContainer>
    )
  })

  it('Should render without crashing for evening time', async () => {
    // @ts-ignore
    global.Date = MockDateThree
    props = {
      dataList: {
        loginTime: '12 Oct 2020, 1:19:50 PM',
        loginIP: '185.86.151.11',
      },
    }
    wrapper = mount(
      <AppContainer>
        <DashboardWelcome {...props} />
      </AppContainer>
    )
  })

  it('Should render without crashing for night time', async () => {
    // @ts-ignore
    global.Date = MockDateFour
    props = {
      dataList: {
        loginTime: '12 Oct 2020, 1:19:50 PM',
        loginIP: '185.86.151.11',
      },
    }
    wrapper = mount(
      <AppContainer>
        <DashboardWelcome {...props} />
      </AppContainer>
    )
  })
})

class MockDateOne extends Date {
  constructor() {
    super('2020-05-14 05:00:00') // add whatever date you'll expect to get
  }
}

/* tslint:disable:max-classes-per-file */
class MockDateTwo extends Date {
  constructor() {
    super('2020-05-14 14:00:00') // add whatever date you'll expect to get
  }
}

/* tslint:disable:max-classes-per-file */
class MockDateThree extends Date {
  constructor() {
    super('2020-05-14 19:00:00') // add whatever date you'll expect to get
  }
}

/* tslint:disable:max-classes-per-file */
class MockDateFour extends Date {
  constructor() {
    super('2020-05-14 23:00:00') // add whatever date you'll expect to get
  }
}
