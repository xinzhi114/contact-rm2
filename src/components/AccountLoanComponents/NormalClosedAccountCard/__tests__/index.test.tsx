import React from 'react'
import { mount } from 'enzyme'
import NormalClosedAccountCard, {
  NormalClosedAccountCard as NormalClosedAccountCardComponent,
} from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'
import OutsideClickHandler from 'react-outside-click-handler'
import ChangeAccountNameModalWindow from '../../ChangeAccountNameModalWindow'
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

const mockNormalClosedAccountCardDatalist = {
  id: 1,
  accountType: 'string',
  isFavourite: false,
  accountName: 'string',
  customerId: 'string',
  firstName: 'string',
  lastName: 'string',
  accountCardInfoNormalClosed: {
    // 'normal', 'closed' accounts
    activity: 'string',
    number: 'string',
    money: 'string',
    percentage: 'string',
    overDraft: 'string',
    closedDate: 'string',
  },
  accountCardInfoLoan: {
    // 'loan' accounts
    title: 'string',
    number: 'string',
    percentage: 'string',
    topIconUrl: 'string',
    interestRate: 'string',
  },
  detailsNormalClosed: {
    // 'normal', 'closed' accounts
    transactionHistory: [
      {
        dateLabel: 'string',
        itemList: [
          {
            iconUrl: 'string',
            title: 'string',
            timeLabel: 'string',
            price: 'string',
            cardSubfix: 'string',
          },
        ],
      },
    ],
    accountInformation: [
      {
        fieldName: 'string',
        fieldValue: 'string',
      },
    ],
    todaysInsight: [
      {
        fieldName: 'string',
        fieldValue: 'string',
      },
    ],
    quickActions: [
      {
        buttonLabel: 'string',
      },
    ],
    cards: [
      {
        bankName: 'string',
        cardType: 'string',
        cardNumber: 'string',
        expireDate: 'string',
      },
    ],
  },
}

const mockProps = {
  isEditMode: false,
  isActive: false,
  dataList: mockNormalClosedAccountCardDatalist,
}

describe('NormalClosedAccountCard component testing', () => {
  let wrapper: WrapperType
  let component: NormalClosedAccountCardComponent
  let props: any
  const createWrapper = async (accountType = 'string', extraProps = {}) => {
    props = {
      t: (param: string) => {
        return param
      },
      ..._.cloneDeep(mockProps),
      onClick: jest.fn(),
      ...extraProps,
    }
    props.dataList.accountType = accountType
    wrapper = mount(
      <AppContainer>
        <NormalClosedAccountCard {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(NormalClosedAccountCardComponent)
      .instance() as NormalClosedAccountCardComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should show popup when clicking setting', async () => {
    component.setState({
      showPopup: false,
    })
    await nextScreen(wrapper)
    onClick(wrapper.find('.setting-wrap.top-setting').at(0))
    await nextScreen(wrapper)
    expect(component.state.showPopup).toBeTruthy()
  })

  it('Should close popup when clicking outside', async () => {
    component.setState({
      showPopup: true,
    })
    await nextScreen(wrapper)
    wrapper.find(OutsideClickHandler).props().onOutsideClick(getMouseEventDefault())
    await nextScreen(wrapper)
    expect(component.state.showPopup).toBeFalsy()
  })

  it('Should show favorite', async () => {
    component.setState({
      isFavourite: false,
    })
    await nextScreen(wrapper)
    onClick(wrapper.find('.tip-panel a.icon-txt.icon-mark').at(0))
    await nextScreen(wrapper)
    expect(component.state.isFavourite).toBeTruthy()
  })

  it('Should show change account name', async () => {
    component.setState({
      showChangeAccountNameModalWindow: false,
    })
    await nextScreen(wrapper)
    onClick(wrapper.find('.tip-panel a.icon-txt.icon-change').at(0))
    await nextScreen(wrapper)
    expect(component.state.showChangeAccountNameModalWindow).toBeTruthy()
  })

  it('Should close change account name modal window', async () => {
    component.setState({
      showChangeAccountNameModalWindow: true,
    })
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(ChangeAccountNameModalWindow).props().onApply()
    await nextScreen(wrapper)
    expect(component.state.showChangeAccountNameModalWindow).toBeFalsy()

    component.setState({
      showChangeAccountNameModalWindow: true,
    })
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(ChangeAccountNameModalWindow).props().onClose()
    await nextScreen(wrapper)
    expect(component.state.showChangeAccountNameModalWindow).toBeFalsy()
  })

  it('Should call onClick when clicking panel', async () => {
    onClick(wrapper.find('.white-card-panel'))
    expect(props.onClick).toHaveBeenCalled()
  })

  it('Should stop propagation when clicking tip panel', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tip-panel'), mouseEvent)
    expect(mouseEvent.stopPropagation).toHaveBeenCalled()
  })

  it('Should prevent default when clicking icon star', async () => {
    component.setState({
      isFavourite: true,
    })
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-star'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should show press bar for current accountType', async () => {
    await createWrapper('current')
    expect(wrapper.find('.press-bar').length).toBeTruthy()
  })

  it('Should show press bar for savings accountType', async () => {
    await createWrapper('savings')
    expect(wrapper.find('.press-bar').length).toBeTruthy()
  })

  it('Should show press bar for loans accountType', async () => {
    await createWrapper('loans')
    expect(wrapper.find('.press-bar').length).toBeTruthy()
  })

  it('Should show bottom close for closed accountType', async () => {
    await createWrapper('closed')
    expect(wrapper.find('.bottom-close').length).toBeTruthy()
  })

  it('Should update ui when panel is in edit mode or is active', async () => {
    await createWrapper('string', {
      isEditMode: true,
      isActive: true,
    })
    expect(wrapper.find('.white-card-panel.edit-status.current').length).toBeTruthy()
  })
})
