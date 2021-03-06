import React from 'react'
import { mount } from 'enzyme'
import ContactUs, { IContactUsProps, ContactUs as ContactUsComponent } from '../index'
import {
  AppContainer,
  nextScreen,
  beforeEachHelper,
  WrapperType,
  onClick,
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
  dataList: {
    phoneNumber: 'string',
    email: 'string',
  },
  showArrow: false,
  t: (param: string) => {
    return param
  },
}

describe('ContactUs component testing', () => {
  let wrapper: WrapperType
  let component: ContactUsComponent
  let props: IContactUsProps
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
      onClickArrow: jest.fn(),
    }
    wrapper = mount(
      <AppContainer>
        <ContactUs {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(ContactUsComponent).instance() as ContactUsComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should show mobile ui', async () => {
    await createWrapper({
      showArrow: true,
    })
    expect(wrapper.find('.rights.desktop-hide.mobile-show').length).toBeTruthy()
  })

  it('Should call onClickArrow when click arrow button', async () => {
    onClick(wrapper.find('.icons.btn-arrow'))
    expect(props.onClickArrow).toHaveBeenCalled()
  })

  it('Should prevent default when clicking icon link', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icon-link').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()

    onClick(wrapper.find('.icon-link').at(2), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    ;(mouseEvent.preventDefault as jest.Mock).mockClear()
  })
})
