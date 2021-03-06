import React from 'react'
import { mount } from 'enzyme'
import { Dropdown } from 'react-bootstrap'
import AccountsTab, { IAccountsTabProps, AccountsTab as AccountsTabComponent } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'

jest.mock('react-i18next', () => ({
  use: () => ({
    init: () => {},
  }),
  // @ts-ignore
  withTranslation: () => (y) => y,
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
  }
})

jest.mock('i18next', () => ({
  init: () => {},
  use: () => {},
  t: (k: any) => k,
  withTranslation: () => {},
}))

describe('AccountsTab component testing', () => {
  let wrapper: WrapperType
  let component: AccountsTabComponent
  let props: IAccountsTabProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      showTab: true,
      currentTab: 'string',
      prevArrowDisabled: false,
      nextArrowDisabled: false,
      clickTab: jest.fn(),
      clickPrevArrow: jest.fn(),
      clickNextArrow: jest.fn(),
      ...extraProps,
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <AccountsTab {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(AccountsTabComponent).instance() as AccountsTabComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should click tab', async () => {
    const onSelect = wrapper.find(Dropdown).props().onSelect
    if (onSelect) {
      onSelect('reasonSelection', getMouseEventDefault())
    }
    await nextScreen(wrapper)
    expect(props.clickTab).toHaveBeenCalled()
    ;(props.clickTab as jest.Mock).mockClear()

    onClick(wrapper.find('.tab-link').at(0))
    await nextScreen(wrapper)
    expect(props.clickTab).toHaveBeenCalled()
    ;(props.clickTab as jest.Mock).mockClear()
  })

  it('Should click previous arrow', async () => {
    onClick(wrapper.find('.btn-arrow.prev'))
    await nextScreen(wrapper)
    expect(props.clickPrevArrow).toHaveBeenCalled()
    ;(props.clickPrevArrow as jest.Mock).mockClear()
  })

  it('Should click next arrow', async () => {
    onClick(wrapper.find('.btn-arrow.next'))
    await nextScreen(wrapper)
    expect(props.clickNextArrow).toHaveBeenCalled()
    ;(props.clickNextArrow as jest.Mock).mockClear()
  })

  it('Should highlight current tab', async () => {
    await createWrapper({
      currentTab: 'Current',
    })
    await nextScreen(wrapper)
    expect(wrapper.find('.tab-link.current').length).toBeTruthy()
  })

  it('Should disable arrow button', async () => {
    await createWrapper({
      prevArrowDisabled: true,
      nextArrowDisabled: true,
    })
    await nextScreen(wrapper)
    expect(wrapper.find('.btn-arrow.next.disabled').length).toBeTruthy()
    expect(wrapper.find('.btn-arrow.prev.disabled').length).toBeTruthy()
  })
})
