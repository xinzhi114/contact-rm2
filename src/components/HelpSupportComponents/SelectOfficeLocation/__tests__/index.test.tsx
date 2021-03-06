import React from 'react'
import { mount } from 'enzyme'
import SelectOfficeLocation, {
  ISelectOfficeLocationProps,
  SelectOfficeLocation as SelectOfficeLocationComponent,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  onClick,
  getMouseEventDefault,
} from '../../../../test/helper'
import { Dropdown } from 'react-bootstrap'

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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => ({}),
  useDispatch: () => jest.fn(),
}))

describe('SelectOfficeLocation component testing', () => {
  let wrapper: WrapperType
  let component: SelectOfficeLocationComponent
  let props: ISelectOfficeLocationProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      individualBusiness: 'business',
      relationshipManager: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
      currentIndex: 0,
      dataList: [
        {
          name: 'North London Office',
          iconUrl: '/assets/filter-build@2x.png',
          officeLocation: {
            addressLine1: 'PO Box 17484',
            addressLine2: '87 Chase Side, London, N14 5WH',
          },
          officeWorkingDays: {
            weekDays: 'Monday - Friday',
            time: '9.15am - 5.15pm',
            tips: '*By appointment only (business customers)',
          },
        },
        {
          name: 'Central London',
          iconUrl: '/assets/filter-build@2x.png',
          officeLocation: {
            addressLine1: 'PO Box 174234',
            addressLine2: '17 Chase Side, London, N14 5WH',
          },
          officeWorkingDays: {
            weekDays: 'Monday - Thursday',
            time: '1.15am - 3.15pm',
            tips: '*By appointment only',
          },
        },
        {
          name: 'Redhill',
          iconUrl: '/assets/filter-build@2x.png',
          officeLocation: {
            addressLine1: 'PO Box 17484',
            addressLine2: '87 Chase Side, London, N14 5WH',
          },
          officeWorkingDays: {
            weekDays: 'Monday - Friday',
            time: '9.15am - 5.15pm',
            tips: '*By appointment only (business customers)',
          },
        },
      ],
      offices: [
        {
          title: 'Redhill',
          workRange: '',
          workDate: '',
          tip: '',
          address: '',
          addressLine1: '',
          addressLine2: '',
          mapUrl: '',
        },
      ],
      selectTab: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <SelectOfficeLocation {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(SelectOfficeLocationComponent)
      .instance() as SelectOfficeLocationComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when click icon tab bar `Online`', () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').last(), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
  })

  it('Should change state on select dropdown tab change', async () => {
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(Dropdown).props().onSelect('Redhill')
    await nextScreen(wrapper)

    expect(wrapper.find(SelectOfficeLocationComponent).instance().state).toMatchObject({
      tabSelection: 'Redhill',
    })
    expect(props.selectTab).toHaveBeenCalled()
  })
})
