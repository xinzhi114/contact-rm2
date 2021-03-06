import React from 'react'
import { mount } from 'enzyme'
import { IHelpSupportProps, HelpSupport } from '../index'
import { WrapperType, AppContainer, nextScreen, beforeEachHelper } from '../../../test/helper'

jest.mock('../../../store/actions/dataAction', () => {
  const result: any = {}
  const lodash = require('lodash')
  const testHelper = require('../../../test/helper')
  lodash.forEach(testHelper.dataActionMethods, (method: string) => {
    result[method] = jest.fn(() => jest.fn())
  })
  return result
})

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
jest.mock('../../../i18n', () => {
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
  helpSupport: {
    dataList: {
      relationshipManager: {
        photoUrl: '/assets/photo-home.jpg',
        stars: 4,
        name: 'Mark Thompson',
        role: 'Relationship Manager',
        state: 'active',
        email: 'support@odyssey.com',
        phoneNumber: '+22 (0) 20 3375 6422',
      },
      faq: [
        {
          faqType: 'default',
          name: 'Strong Customer Authentication',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Strong Customer Authentication FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'default',
          name: 'Online Easy Access Account',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Online Easy Access Account FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'default',
          name: 'Online ISA',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Online ISA FAQs',
          faqList: [
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'default',
          name: 'Online Banking',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Online Banking FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'default',
          name: 'Visa Secure',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Visa Secure FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'default',
          name: 'Online Security',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'Online Security FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
        {
          faqType: 'insight',
          name: 'Insight',
          iconUrl: '/assets/icon-insight@2x.png',
          categoryLabel: 'Insight',
          faqList: [
            {
              title: 'Debt Consolidation Loan',
              insightList: [
                "Loans available from <span class='green-txt'>£1,000</span> to <span class='green-txt'>£25,000</span>",
                'Existing customers can get a quick decision - you could receive immediate funds if accepted',
                'No setup or arrangement fees',
              ],
              insightRightLabel:
                "<span class='green-txt'>3.3% APR representative</span><br/> for loans between <span class='green-txt'>£7,000</span> and <span class='green-txt'>£15,000.</span>",
            },
            {
              title: 'Premier Business Loan',
              insightList: [
                "Loans available from <span class='green-txt'>£2,100</span> to <span class='green-txt'>£46,000</span>",
                'Existing customers can get a quick decision',
                'No setup',
              ],
              insightRightLabel:
                "<span class='green-txt'>3.3% APR representative</span><br/> for loans between <span class='green-txt'>£2,500</span> and <span class='green-txt'>£36,000.</span>",
            },
            {
              title: 'Small Business Loan',
              insightList: [
                "Loans available from <span class='green-txt'>£1,000</span> to <span class='green-txt'>£25,000</span>",
                'Existing customers can get a quick decision - you could receive immediate funds if accepted',
                'No setup or arrangement fees',
              ],
              insightRightLabel:
                "<span class='green-txt'>3.3% APR representative</span><br/> for loans between <span class='green-txt'>£7,000</span> and <span class='green-txt'>£15,000.</span>",
            },
            {
              title: 'Business Overdraft',
              insightList: [
                "Loans available from <span class='green-txt'>£1,000</span> to <span class='green-txt'>£25,000</span>",
                'Existing customers can get a quick decision - you could receive immediate funds if accepted',
                'No setup or arrangement fees',
              ],
              insightRightLabel:
                "<span class='green-txt'>3.3% APR representative</span><br/> for loans between <span class='green-txt'>£7,000</span> and <span class='green-txt'>£15,000.</span>",
            },
          ],
        },
        {
          faqType: 'default',
          name: 'The General Data Protection Regulation (GDPR)',
          iconUrl: '/assets/icon-lock-blue@2x.png',
          categoryLabel: 'The General Data Protection Regulation (GDPR) FAQs',
          faqList: [
            {
              title: 'Q. What is Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Why is Strong Customer Authentication being introduced?',
              description:
                'Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. What countries does this regulation apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. When is it being introduced?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Who does it apply to?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: "Q. I don't use Online Banking, will this impact me?",
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How will Online Banking change?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. Where can I find more information on Strong Customer Authentication?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
            {
              title: 'Q. How does the Cynergy Bank Authenticator App work?',
              description:
                'Banks across Europe are currently introducing additional security for online transactions, known as Strong Customer Authentication (SCA). This means you may be asked to provide an additional authentication code when using Online Banking to verify it’s you logging in or completing a transaction.',
            },
          ],
        },
      ],
      contactBank: {
        call: [
          {
            contactTitle: 'Contact Number for UK Caller',
            telephone: '0345 850 5555',
            availablityTime: '9.15am – 5.15pm (Monday - Friday)',
          },
          {
            contactTitle: 'Contact Number for non-UK Caller',
            telephone: '+44 (0) 20 3375 6422',
            availablityTime: '9.15am – 5.15pm (Monday - Friday)',
          },
        ],
        secureEmail: {
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
      },
      regionalOfficeAddresses: [
        {
          name: 'North London Office',
          iconUrl: '/assets/filter-build@2x.png',
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          name: 'Birmingham',
          iconUrl: '/assets/filter-build@2x.png',
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          name: 'Manchester',
          iconUrl: '/assets/filter-build@2x.png',
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          name: 'Scotland',
          iconUrl: '/assets/filter-build@2x.png',
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
          name: 'Bristol',
          iconUrl: '/assets/filter-build@2x.png',
          mapUrl:
            'https://www.google.com/maps/place/Chinatown,+San+Francisco,+CA/@37.7939041,-122.4103965,15.75z/data=!4m5!3m4!1s0x8085808b58a58a1d:0x289f3092660f80ac!8m2!3d37.7941378!4d-122.4077914',
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
    },
  },
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

describe('HelpSupport component testing', () => {
  let wrapper: WrapperType
  let props: IHelpSupportProps

  const createWrapper = async (
    extraProps = {},
    initialEntries = ['/helpSupport/:tabIndex'],
    path = '/helpSupport/0'
  ) => {
    props = {
      // ..._.cloneDeep(mockProps),
      ...extraProps,
      dataAction: {
        getHelpSupportData: jest.fn(),
      },
      t: (param: string) => {
        return param
      },
      helpSupport: {
        dataList: {
          contactBank: mockProps.helpSupport.dataList.contactBank,
          faq: mockProps.helpSupport.dataList.faq as any,
          regionalOfficeAddresses: mockProps.helpSupport.dataList.regionalOfficeAddresses,
          relationshipManager: mockProps.helpSupport.dataList.relationshipManager,
        },
      },
      history: mockProps.history,
      location: mockProps.location,
      match: mockProps.match,
    }
    wrapper = mount(
      <AppContainer initialEntries={initialEntries} path={path}>
        <HelpSupport {...props} />
      </AppContainer>
    )
    await nextScreen(wrapper)
  }

  beforeEach(async () => {
    beforeEachHelper()
    await createWrapper()
  })

  it('Should renders without crashing', () => {
    expect(wrapper).not.toEqual(undefined)
  })

  // it('Should reset state when component unmount', async () => {
  //     component.componentWillUnmount()
  //     await nextScreen(wrapper)
  //     expect(component.state.error).toBeFalsy()
  // })

  // it('Should do verify', async () => {
  //     component.setState({
  //         stepIndex: 0,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormRegistrationAccountVerification).props().onVerify({})
  //     await nextScreen(wrapper)
  //     expect(component.state.stepIndex).toEqual(1)
  // })

  // it('Should call request on register', async (done) => {
  //     component.setState({
  //         stepIndex: 1,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormContactInformation).props().onRegister({})
  //     await nextScreen(wrapper)
  //     expect(component.state.stepIndex).toEqual(2)

  //     component.setState({
  //         stepIndex: 1,
  //     })
  //     simulateNetworkError()
  //     await nextScreen(wrapper)
  //     wrapper.find(FormContactInformation).props().onRegister({})
  //     jest.useRealTimers()
  //     setTimeout(async () => {
  //         expect(component.state.error).toBeTruthy()
  //         done()
  //     })
  // })

  // it('Should do confirm', async (done) => {
  //     component.setState({
  //         stepIndex: 2,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormAuthOTP).props().onConfirm('otp')
  //     await nextScreen(wrapper)
  //     expect(component.state.stepIndex).toEqual(3)

  //     simulateNetworkError()
  //     component.setState({
  //         stepIndex: 2,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormAuthOTP).props().onConfirm('otp')

  //     jest.useRealTimers()
  //     setTimeout(async () => {
  //         expect(component.state.error).toBeTruthy()
  //         done()
  //     })
  // })

  // it('Should navigate when on locked', async () => {
  //     component.setState({
  //         stepIndex: 2,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormAuthOTP).props().onLocked()
  //     expect(spyOnPushHistory).toHaveBeenCalled()
  // })

  // it('Should navigate when complele', async () => {
  //     component.setState({
  //         stepIndex: 3,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(RegistrationCompleted).props().onConfirm()
  //     expect(spyOnPushHistory).toHaveBeenCalled()
  // })

  // it('Should show/hide modal window', async () => {
  //     component.setState({
  //         stepIndex: 1,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(FormContactInformation).props().onShowModalWindow({})
  //     await nextScreen(wrapper)
  //     expect(component.state.showModalWindow).toBeTruthy()

  //     wrapper.find(ConfirmModalWindow).props().onClose({})
  //     await nextScreen(wrapper)
  //     expect(component.state.showModalWindow).toBeFalsy()
  // })

  // it('Should reduce step when clicking mobile back button', async () => {
  //     component.setState({
  //         stepIndex: 2,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(LoginHeader).props().mobileBackStep()
  //     await nextScreen(wrapper)
  //     expect(component.state.stepIndex).toEqual(1)

  //     component.setState({
  //         stepIndex: 0,
  //     })
  //     await nextScreen(wrapper)
  //     wrapper.find(LoginHeader).props().mobileBackStep()
  //     expect(spyOnPushHistory).toHaveBeenCalled()
  // })

  // it('Should reset error when clear', async () => {
  //     component.setState({
  //         stepIndex: 2,
  //     })
  //     await nextScreen(wrapper)
  //     const onClear = wrapper.find(FormAuthOTP).props().onClear
  //     if (onClear) onClear()
  //     expect(component.state.error).toBeFalsy()
  // })

  // it('Should get phone number', async () => {
  //     component.formData.phoneNumber = '11111'
  //     expect(component.getPhone()).toEqual('1111')
  // })

  // it('Should navigate when show login', async () => {
  //     wrapper.find(LoginHeader).props().onShowLogin()
  //     expect(spyOnPushHistory).toHaveBeenCalled()
  // })
})
