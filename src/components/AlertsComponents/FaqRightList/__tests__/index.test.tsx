import React from 'react'
import { mount } from 'enzyme'
import FaqRightList, { FaqRightList as FaqRightListComponent, IFaqRightListProps } from '../index'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../../test/helper'
import _ from 'lodash'

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

const mockProps: IFaqRightListProps = {
  t: (param: string) => {
    return param
  },
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
}

describe('FaqRightList component testing', () => {
  let wrapper: WrapperType
  let component: FaqRightListComponent

  beforeEach(async () => {
    beforeEachHelper()
    const props = _.cloneDeep(mockProps)
    wrapper = mount(
      <AppContainer>
        <FaqRightList {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(FaqRightListComponent).instance() as FaqRightListComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
