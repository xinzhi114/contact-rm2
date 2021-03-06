import React from 'react'
import { mount } from 'enzyme'
import SelectContactBankOptions, {
  ISelectContactBankOptionsProps,
  SelectContactBankOptions as SelectContactBankOptionsComponent,
} from '..'
import {
  WrapperType,
  beforeEachHelper,
  AppContainer,
  nextScreen,
  getMouseEventDefault,
  onClick,
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

describe('SelectContactBankOptions component testing', () => {
  let wrapper: WrapperType
  let component: SelectContactBankOptionsComponent
  let props: ISelectContactBankOptionsProps

  beforeEach(async () => {
    beforeEachHelper()
    props = {
      relationshipManager: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
      tabArray: ['Call', 'Secure Email', 'Online', 'Chat'],
      currentTabIndex: 0,
      currentSecureEmailCategoryIndex: 0,
      dataList: {
        totalNumber: 40,
        categoryList: [
          {
            categoryName: 'Inbox',
            categoryTotalNumber: 15,
            unreadNumber: 10,
            unread: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '05 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '01 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
            readNumber: 5,
            read: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.cn',
                    sn: 'MG04022510',
                    time: '02 Oct 2020, 03:00 PM',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '05 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
          },
          {
            categoryName: 'Sent',
            categoryTotalNumber: 25,
            unreadNumber: 12,
            unread: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum Sent',
                    replyEmail: 'no_reply@odyssey.cn',
                    sn: 'MG04022500',
                    time: '01 Oct 2020, 03:00 PM',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipi',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '03 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '02 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
            readNumber: 8,
            read: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '08 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
          },
          {
            categoryName: 'Trash',
            categoryTotalNumber: 15,
            unreadNumber: 10,
            unread: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '05 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '01 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '01 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
            readNumber: 5,
            read: [
              {
                groupTitle: '',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '06 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
              {
                groupTitle: '05 October 2020',
                emailList: [
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                  {
                    title: 'Lorem Ipsum',
                    replyEmail: 'no_reply@odyssey.com',
                    sn: 'MG04022515',
                    time: '05 Oct 2020, 03:00 PM',
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                  },
                ],
              },
            ],
          },
        ],
      },
      individualBusiness: 'Open accounts',
      selectSecureEmailCategory: jest.fn(),
      selectTab: jest.fn(),
      t: (param: string) => {
        return param
      },
    }
    wrapper = mount(
      <AppContainer>
        <SelectContactBankOptions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(SelectContactBankOptionsComponent)
      .instance() as SelectContactBankOptionsComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })

  it('Should prevent default when click category name', async () => {
    props.currentTabIndex = 1
    wrapper = mount(
      <AppContainer>
        <SelectContactBankOptions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.select-item').at(0), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectSecureEmailCategory).toHaveBeenCalled()
  })

  it('Should prevent default when click icon arrow', async () => {
    props.currentTabIndex = 2
    wrapper = mount(
      <AppContainer>
        <SelectContactBankOptions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.icons.icon-arrow'), mouseEvent)
    expect(mouseEvent.stopPropagation).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
    await nextScreen(wrapper)
    expect(component.state.isOpenSecureEmail).toBeFalsy()
  })

  it('Should prevent default when click icon tab bar `Online`', () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').last(), mouseEvent)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
  })

  it('Should prevent default when click icon tab bar `Secure Email`', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').at(1), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
    expect(component.state.isOpenSecureEmail).toBeTruthy()
  })

  it('Should prevent default when click icon tab bar `Call`', async () => {
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').first(), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
    expect(component.state.isOpenSecureEmail).toBeFalsy()
  })

  it('Should change state on select dropdown tab change', async () => {
    props.individualBusiness = 'business'
    wrapper = mount(
      <AppContainer>
        <SelectContactBankOptions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(Dropdown).at(0).props().onSelect('Online')
    await nextScreen(wrapper)

    expect(wrapper.find(SelectContactBankOptionsComponent).instance().state).toMatchObject({
      tabSelection: 'Online',
    })
    expect(props.selectTab).toHaveBeenCalled()
  })

  it('Should prevent default when click icon tab bar `Chat`', async () => {
    props.currentTabIndex = 3
    wrapper = mount(
      <AppContainer>
        <SelectContactBankOptions {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    const mouseEvent = getMouseEventDefault()
    onClick(wrapper.find('.tab-bar').last(), mouseEvent)
    await nextScreen(wrapper)
    expect(mouseEvent.preventDefault).toHaveBeenCalled()
    expect(props.selectTab).toHaveBeenCalled()
  })
})
