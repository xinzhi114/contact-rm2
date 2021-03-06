import React from 'react'
import { mount } from 'enzyme'
import ContactBankSecureEmailDetails, {
  ContactBankSecureEmailDetails as ContactBankSecureEmailDetailsComponent,
} from '..'
import { WrapperType, beforeEachHelper, AppContainer, nextScreen } from '../../../../test/helper'

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

describe('ContactBankSecureEmailDetails component testing', () => {
  let wrapper: WrapperType
  let component: ContactBankSecureEmailDetailsComponent
  let props: any = {
    currentContactBankSecureEmailCategoryIndex: 0,
    secureEmailDataList: {
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
    dataList: {
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
    t: (param: string) => {
      return param
    },
  }

  beforeEach(async () => {
    beforeEachHelper()
    props = {}
    wrapper = mount(
      <AppContainer>
        <ContactBankSecureEmailDetails {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
    component = wrapper
      .find(ContactBankSecureEmailDetailsComponent)
      .instance() as ContactBankSecureEmailDetailsComponent
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
    expect(component).toBeTruthy()
  })
})
