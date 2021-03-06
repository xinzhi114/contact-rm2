import React from 'react'
import { mount } from 'enzyme'
import TransactionHistory, { TransactionHistory as TransactionHistoryComponent } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onChange,
  getMouseEventDefault,
  onClick,
} from '../../../../test/helper'
import _ from 'lodash'
import TransactionHistoryFiltersModalWindow from '../../TransactionHistoryFiltersModalWindow'
import TransactionHistoryDownloadModalWindow from '../../TransactionHistoryDownloadModalWindow'

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

const mockDataList = [
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
]
describe('AccountLoanComponents TransactionHistory component testing', () => {
  let wrapper: WrapperType
  let component: TransactionHistoryComponent
  let props: any
  const createWrapper = async (extraProps = {}) => {
    props = {
      ...extraProps,
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <TransactionHistory {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(TransactionHistoryComponent).instance() as TransactionHistoryComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should handle input change', async () => {
    onChange(wrapper.find('.search-bar .seach-module .inputs input'), {
      target: {
        value: 'searchText',
      },
    })
    await nextScreen(wrapper)
    // expect(component.state.searchText).toBeTruthy()
    // expect(wrapper.find(TransactionHistoryComponent).instance().state).toMatchObject({
    //   searchText: 'searchText',
    // })
    expect(component.state.shownItemListTransactions?.length).toBeFalsy()

    await createWrapper({
      dataList: _.cloneDeep(mockDataList),
    })

    onChange(wrapper.find('.search-bar .seach-module .inputs input'), {
      target: {
        value: '',
      },
    })
    await nextScreen(wrapper)
    expect(component.state.searchText).toBe('')
    expect(component.state.shownItemListTransactions?.length).toBe(0)
  })

  it('Should prevent default when clicking blue text', async () => {
    props.accountType = 'current'
    wrapper = mount(
      <AppContainer>
        <TransactionHistory {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(TransactionHistoryComponent).instance() as TransactionHistoryComponent

    component.setState({
      shownItemListTransactions: [
        {
          dateLabel: '8 OCT',
          itemList: [
            {
              iconUrl: '/assets/icon-wifi.svg',
              title: 'Vodafone Internet',
              timeLabel: '12:04 am, Mobile services',
              price: '–£49.<em>00</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
            {
              iconUrl: '/assets/bus.svg',
              title: 'London TFL',
              timeLabel: '8:40 am, Transportation',
              price: '–£24.<em>89</em>',
              cardSubfix: '4597',
              changedLabel: '£24.12',
              changedTypeRed: false,
            },
          ],
        },
        {
          dateLabel: '2 OCT',
          itemList: [
            {
              iconUrl: '/assets/card.svg',
              title: 'CC Supplies Ltd.',
              timeLabel: '6:32 pm, Spending',
              price: '–£89.<em>99</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
            {
              iconUrl: '/assets/bus.svg',
              title: 'London TFL',
              timeLabel: '8:40 am, Transporation',
              price: '–£24.<em>89</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
            {
              iconUrl: '/assets/card.svg',
              title: 'London TFL',
              timeLabel: '8:40 am, Spending',
              price: '–£89.<em>99</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
          ],
        },
        {
          dateLabel: '29 AUG',
          itemList: [
            {
              iconUrl: '/assets/icon-business.png',
              title: 'AAPL Income montly salary',
              timeLabel: '09:30 am, Business',
              price: '£7,000.<em>00</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
            {
              iconUrl: '/assets/icon-business.png',
              title: 'AAPL Income montly salary',
              timeLabel: '09:30 am, Business',
              price: '£7,000.<em>00</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
            {
              iconUrl: '/assets/icon-business.png',
              title: 'AAPL Income montly salary',
              timeLabel: '09:30 am, Business',
              price: '£7,000.<em>00</em>',
              cardSubfix: '4597',
              changedLabel: '-£49.00',
              changedTypeRed: true,
            },
          ],
        },
      ],
      currentTab: 'Transactions',
    })
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.blue-txt').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should show/hide transaction history filter modal window', async () => {
    onClick(wrapper.find('a.icons.btn-filter'))
    await nextScreen(wrapper)
    expect(wrapper.find(TransactionHistoryFiltersModalWindow).length).toBeTruthy()

    // close after applying
    // @ts-ignore
    wrapper.find(TransactionHistoryFiltersModalWindow).props().onApply()
    await nextScreen(wrapper)
    expect(component.state.showFilterModalWindow).toBeFalsy()

    // close after closing
    component.setState({
      showFilterModalWindow: true,
    })
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(TransactionHistoryFiltersModalWindow).props().onClose()
    await nextScreen(wrapper)
    expect(component.state.showFilterModalWindow).toBeFalsy()
  })

  it('Should show/hide transaction history download modal window', async () => {
    await createWrapper({
      showDownload: true,
    })

    onClick(wrapper.find('.gray-title a.btn.btn-green'))
    await nextScreen(wrapper)
    expect(wrapper.find(TransactionHistoryDownloadModalWindow).length).toBeTruthy()

    // close after applying
    // @ts-ignore
    wrapper.find(TransactionHistoryDownloadModalWindow).props().onApply()
    await nextScreen(wrapper)
    expect(component.state.showDownloadModalWindow).toBeFalsy()

    // close after closing
    onClick(wrapper.find('.gray-title a.btn.btn-green'))
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(TransactionHistoryDownloadModalWindow).props().onClose()
    await nextScreen(wrapper)
    expect(component.state.showDownloadModalWindow).toBeFalsy()
  })

  it('Should update panel class when isOpen', async () => {
    component.setState({
      isOpend: true,
    })
    await nextScreen(wrapper)
    expect(wrapper.find('.transation-panel.white-panel.open').length).toBeTruthy()

    onClick(wrapper.find('a.icons.btn-arrow'))
    await nextScreen(wrapper)
    expect(wrapper.find('.transation-panel.white-panel.open').length).toBeFalsy()
  })

  it('Should show icon four arrow when in edit mode', async () => {
    await createWrapper({
      isEditMode: true,
    })
    expect(wrapper.find('.icons.icon-four-arrow').length).toBeTruthy()
  })
})
