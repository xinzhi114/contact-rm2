import React from 'react'
import { mount } from 'enzyme'
import QuickActions, { QuickActions as QuickActionsComponent } from '../index'
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
  t: (param: string) => {
    return param
  },
  isEditMode: false,
  dataList: [
    {
      buttonLabel: 'string',
    },
  ],
}

describe('QuickActions component testing', () => {
  let wrapper: WrapperType
  let component: QuickActionsComponent
  let props: any
  const createWrapper = async (extraProps = {}) => {
    props = {
      ..._.cloneDeep(mockProps),
      ...extraProps,
    }
    wrapper = mount(
      <AppContainer>
        <QuickActions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper.find(QuickActionsComponent).instance() as QuickActionsComponent
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should show icon four arrow if is in edit mode', async () => {
    await createWrapper({
      isEditMode: true,
    })
    expect(wrapper.find('.icons.icon-four-arrow').length).toBeTruthy()
  })

  it('Should toggle isOpend', async () => {
    onClick(wrapper.find('.icons.btn-arrow'))
    await nextScreen(wrapper)
    expect(component.state.isOpend).toBeFalsy()
  })

  it('Should prevent default when clicking some icon', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.btn-setting'), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should render when `shownClosed` true', async () => {
    props.shownClosed = true
    props.isEditMode = true
    props.shownLoan = true
    wrapper = mount(
      <AppContainer>
        <QuickActions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    expect(wrapper).not.toEqual(undefined)
  })

  it('Should prevent default when click `Payment Transfer`', async () => {
    props.shownClosed = false
    props.isEditMode = true
    props.shownLoan = false
    wrapper = mount(
      <AppContainer>
        <QuickActions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.row-line').first(), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })

  it('Should prevent default when click btn close `Account Management`', async () => {
    props.shownClosed = false
    props.isEditMode = true
    props.shownLoan = false
    wrapper = mount(
      <AppContainer>
        <QuickActions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)

    onClick(wrapper.find('.row-line').at(1))
    await nextScreen(wrapper)

    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.btn-close').first(), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
  })
})
