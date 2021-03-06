import React from 'react'
import { mount } from 'enzyme'
import AccountInformation, { AccountInformation as AccountInformationComponent } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
} from '../../../../test/helper'
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
  isEditMode: false,
  reasonDropdownOptions: ['string'],
  productForAutoClosure: [
    {
      title: 'string',
      category: 'string',
    },
  ],
  isFavourite: false,
  accountName: 'string',
  dataList: [
    {
      fieldName: 'string',
      fieldValue: 'string',
    },
  ],
  t: (param: string) => {
    return param
  },
}
describe('AccountInformation component testing', () => {
  let wrapper: WrapperType
  let component: AccountInformationComponent
  const createWrapper = async (extraProps = {}) => {
    const props = {
      ..._.cloneDeep(mockProps),
      accountClosureRequestSuccess: jest.fn(),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <AccountInformation {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(AccountInformationComponent).instance() as AccountInformationComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should hide more details', async () => {
    await createWrapper({
      dataList: [
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
        _.cloneDeep(mockProps.dataList[0]),
      ],
    })
    component.setState({
      showMoreDetails: false,
      isOpend: true,
    })
    await nextScreen(wrapper)

    onClick(wrapper.find('.center-more a.icons.link-arrow').at(0))
    await nextScreen(wrapper)
    expect(component.state.showMoreDetails).toBeTruthy()
  })
})
