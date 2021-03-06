import React from 'react'
import { mount } from 'enzyme'
import CardAccessRightBox, { CardAccessRightBox as CardAccessRightBoxComponent } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
  onChange,
  getMouseEventDefault,
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
  opt: {
    dataList: {
      optValue: 'string',
    },
  },
  dataList: [
    {
      type: 'lockDebitCard',
      iconUrl: '/assets/icon-lock-blue@2x.png',
      title: 'Lock debit card',
      description: 'Locked on 14 October 2020, 10:00 AM',
      rightGrayText: '',
      actived: true,
    },
    {
      type: 'blockDebitCard',
      iconUrl: '/assets/icon-block-debit@2x.png',
      title: 'Block debit card',
      description: 'Blocked on 15 October 2020, 09:03 AM',
      rightGrayText: '',
      actived: true,
    },
    {
      type: 'revealPINCVV',
      iconUrl: '/assets/reveal@2x.png',
      title: 'Reveal PIN/CVV',
      description: '',
      rightGrayText: 'PIN 787895 / CVV 022',
      actived: false,
    },
    {
      type: 'channelCanBeUsed',
      iconUrl: '/assets/channel@2x.png',
      title: 'Channel can be used',
      description: 'ATM',
      rightGrayText: '',
      actived: true,
    },
  ],
  dataAction: {},
  confirm: {},
  t: (param: string) => {
    return param
  },
}

describe('CardAccessRightBox component testing', () => {
  let wrapper: WrapperType
  let component: CardAccessRightBoxComponent
  let props
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <CardAccessRightBox {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(CardAccessRightBoxComponent).instance() as CardAccessRightBoxComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should show/hide revieal pin cvv popup', async () => {
    const dataList = _.cloneDeep(component.state.dataList) || _.cloneDeep(mockProps.dataList)
    // dataList.revealPINCVV.actived = false
    component.setState({ dataList })
    await nextScreen(wrapper)

    onClick(wrapper.find('.check-round-wrap input').at(2))
    await nextScreen(wrapper)
    expect(component.state.showRevealPINCVVPopup).toBeTruthy()

    // dataList.revealPINCVV.actived = true
    component.setState({ dataList })
    await nextScreen(wrapper)
    onClick(wrapper.find('.check-round-wrap input').at(2))
    await nextScreen(wrapper)
    // expect(component.state.dataList?.revealPINCVV.actived).toBeFalsy()

    component.setState({ optCode: 'string' })
    await nextScreen(wrapper)
    onClick(wrapper.find('.btn.btn-green').at(0))
    await nextScreen(wrapper)
    expect(component.state.showRevealPINCVVPopup).toBeFalsy()

    onClick(wrapper.find('a.green-link').at(0))
    await nextScreen(wrapper)
    expect(component.state.showRevealPINCVVPopup).toBeFalsy()

    await createWrapper({
      opt: undefined,
    })
    component.setState({ optCode: 'string' })
    await nextScreen(wrapper)
    onClick(wrapper.find('.btn.btn-green').at(0))
    await nextScreen(wrapper)
    expect(component.state.showRevealPINCVVError).toBeTruthy()
  })

  it('Should handle check change', async () => {
    onChange(wrapper.find('.check-round-wrap input').at(0), {
      target: {
        checked: true,
      },
    })
    await nextScreen(wrapper)
    // expect(component.state.dataList?.lockDebitCard).toBeTruthy()

    onChange(wrapper.find('.check-round-wrap input').at(1), {
      target: {
        checked: true,
      },
    })
    await nextScreen(wrapper)
    // expect(component.state.dataList?.blockDebitCard).toBeTruthy()
  })

  it('Should handle optCode input change', async () => {
    onChange(wrapper.find('.inputs input').at(0), {
      target: {
        value: 'test',
        checked: true,
        validity: {
          valid: true,
        },
      },
    })
    await nextScreen(wrapper)
    expect(component.state.optCode).toEqual('test')

    onChange(wrapper.find('.inputs input').at(0), {
      target: {
        value: 'test2',
        checked: true,
        validity: {
          valid: false,
        },
      },
    })
    await nextScreen(wrapper)
    expect(component.state.optCode).toEqual('test')
  })

  it('Should call prevent default when clicking icon line setting', async () => {
    const mouseEvent = getMouseEventDefault()

    onClick(wrapper.find('.icons.icon-line-setting').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()

    onClick(wrapper.find('.icons.icon-line-setting').at(1), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()
  })
})
