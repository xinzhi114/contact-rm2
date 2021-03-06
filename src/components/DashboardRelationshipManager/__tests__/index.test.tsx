import React from 'react'
import { mount } from 'enzyme'
import DashboardRelationshipManager from '../index'
import { AppContainer, beforeEachHelper, nextScreen, WrapperType } from '../../../test/helper'

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
jest.mock('../../../i18n', () => {
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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => ({}),
  useDispatch: () => jest.fn(),
}))

describe('DashboardRelationshipManager tests', () => {
  let wrapper: WrapperType
  let props: {
    data: {
      photoUrl: string
      stars: number
      name: string
      role: string
      state: string
      email: string
      phoneNumber: string
      yourNextAppointment: {
        timeFull: string
        timeRange: string
        subject: string
        iconUrl: string
        topLabel: string
        bottomLabel: string
      }
    }
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      data: {
        photoUrl: 'string',
        stars: 1,
        name: 'string',
        role: 'string',
        state: 'Available',
        email: 'string',
        phoneNumber: 'string',
        yourNextAppointment: {
          timeFull: 'string',
          timeRange: 'string',
          subject: 'string',
          iconUrl: 'string',
          topLabel: 'string',
          bottomLabel: 'string',
        },
      },
    }
    wrapper = mount(
      <AppContainer>
        <DashboardRelationshipManager {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })
})
