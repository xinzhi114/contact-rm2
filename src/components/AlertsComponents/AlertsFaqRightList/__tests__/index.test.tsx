import React from 'react'
import { mount } from 'enzyme'
import { AlertsFaqRightList } from '../index'
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

const mockProps = {
  t: (param: string) => {
    return param
  },
  dataList: {
    name: 'string',
    iconUrl: 'string',
    categoryLabel: 'string',
    faqList: [
      {
        title: 'string',
        description: 'string',
        expanded: false,
      },
      {
        title: 'string',
        description: undefined,
        expanded: false,
      },
    ],
  },
}

describe('AlertsFaqRightList component testing', () => {
  let wrapper: WrapperType

  beforeEach(async () => {
    beforeEachHelper()
    const props = _.cloneDeep(mockProps)
    wrapper = mount(
      <AppContainer>
        <AlertsFaqRightList {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  // it('Should show more', async () => {
  //   component.setState({
  //     isShownMore: false,
  //     dataList: {
  //       ...mockProps.dataList,
  //       faqList: [
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //         _.cloneDeep(mockProps.dataList.faqList[0]),
  //       ],
  //     },
  //   })
  //   await nextScreen(wrapper)

  //   onClick(wrapper.find('.green-link'))
  //   await nextScreen(wrapper)
  //   expect(component.state.isShownMore).toBeTruthy()
  // })

  // it('Should expand faq list item', async () => {
  //   component.state.dataList.faqList[0].expanded = false
  //   component.setState({
  //     dataList: component.state.dataList,
  //   })
  //   await nextScreen(wrapper)

  //   onClick(wrapper.find('.expend-title.flex-grid').at(0))
  // })
})
