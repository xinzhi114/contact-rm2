export const data = {
  dataList: {
    mostActiveAccounts: [
      {
        id: 1,
        accountType: 'normal',
        isFavourite: false,
        accountName: 'ODT-CURRENT',
        accountCardInfoNormalClosed: {
          activity: 'Current Account',
          number: '1094  4545  3121  01',
          money: '£170,028.23',
          percentage: '75',
          overDraft: '49,200.00',
          closedDate: '',
        },
      },
      {
        id: 2,
        accountType: 'normal',
        isFavourite: true,
        accountName: 'OPT-CURRENT',
        accountCardInfoNormalClosed: {
          activity: 'Saving Account',
          number: '1094  4536  5765  85',
          money: '£350,028.23',
          percentage: '60',
          overDraft: '£6,200.00',
          closedDate: '',
        },
      },
      {
        id: 3,
        accountType: 'normal',
        isFavourite: false,
        accountName: 'ODT-CURRENT',
        accountCardInfoNormalClosed: {
          activity: 'Yearly ISA account',
          number: '1094  4545  3121  01',
          money: '£170,028.23',
          percentage: '65',
          overDraft: '£1,500.00',
          closedDate: '',
        },
      },
    ],
    contactUs: {
      phoneNumber: '+44 20 7646 0612',
      email: 'support@odyssey.com',
    },
    relationshipManager: {
      photoUrl: '/assets/photo-home.jpg',
      stars: 4,
      name: 'Mark Thompson',
      role: 'Relationship Manager',
      state: 'active',
      email: 'support@odyssey.com',
      phoneNumber: '+22 (0) 20 3375 6422',
    },
    transactionHistory: [
      {
        dateLabel: '8 OCT',
        itemList: [
          {
            iconUrl: '/assets/icon-wifi.svg',
            title: 'Vodafone Internet',
            timeLabel: '12:04 am, Mobile services',
            price: '–£49.<em>00</em>',
            cardSubfix: '4597',
          },
          {
            iconUrl: '/assets/bus.svg',
            title: 'London TFL',
            timeLabel: '8:40 am, Transportation',
            price: '–£24.<em>89</em>',
            cardSubfix: '4597',
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
          },
          {
            iconUrl: '/assets/bus.svg',
            title: 'London TFL',
            timeLabel: '8:40 am, Transporation',
            price: '–£24.<em>89</em>',
            cardSubfix: '4597',
          },
          {
            iconUrl: '/assets/card.svg',
            title: 'London TFL',
            timeLabel: '8:40 am, Spending',
            price: '–£89.<em>99</em>',
            cardSubfix: '4597',
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
          },
        ],
      },
    ],
    portfolioOverview: {
      carousel: [
        {
          price: '£3,123,000.<em>00</em>',
          title: 'YOUR NET WEALTH',
        },
        {
          price: '£3,112,000.<em>00</em>',
          title: 'YOUR NET WEALTH',
        },
      ],
      productList: [
        {
          iconUrl: '/assets/property-value@2x.png',
          price: '£3,000,000.<em>00</em>',
          title: 'PROPERTY VALUE',
        },
        {
          iconUrl: '/assets/gz-systems@2x.png',
          price: '£43,000.<em>00</em>',
          title: 'Business Accounts',
        },
        {
          iconUrl: '/assets/savings@2x.png',
          price: '£80,000.<em>00</em>',
          title: 'SAVINGS',
        },
        {
          iconUrl: '/assets/investment-fund@2x.png',
          price: '£2,000,000.<em>00</em>',
          title: 'Investment fund',
        },
        {
          iconUrl: '/assets/loan@2x.png',
          price: '-£1,200,000.<em>00</em>',
          title: 'Loan',
        },
        {
          iconUrl: '/assets/credit-card@2x.png',
          price: '-£4.000.<em>00</em>',
          title: 'Credit card',
        },
      ],
    },
    financeManager: {
      periodSelection: 'Weekly prediction',
      periodDropdownOptions: ['Weekly prediction', 'Monthly prediction', 'Yearly prediction'],
      overall: {
        used: '24,960.00',
        total: '80,000.00',
      },
      budgetList: [
        {
          iconUrl: '/assets/book-open.svg',
          title: 'Education',
          used: '4,000.00',
          total: '10,000.00',
          percentage: '40',
        },
        {
          iconUrl: '/assets/plane-departure.svg',
          title: 'Travel',
          used: '5,000.00',
          total: '10,000.00',
          percentage: '50',
        },
        {
          iconUrl: '/assets/lazzada-online@2x.png',
          title: 'Shopping',
          used: '2,500.00',
          total: '5,000.00',
          percentage: '50',
        },
        {
          iconUrl: '/assets/healthy.svg',
          title: 'Healthcare',
          used: '560.00',
          total: '10,000.00',
          percentage: '5',
        },
        {
          iconUrl: '/assets/shopping-cart.svg',
          title: 'Groceries',
          used: '2,500.00',
          total: '5,000.00',
          percentage: '50',
        },
        {
          iconUrl: '/assets/bills.svg',
          title: 'Bills & Utilities',
          used: '1,500.00',
          total: '5,000.00',
          percentage: '30',
        },
        {
          iconUrl: '/assets/home.svg',
          title: 'Mortgage',
          used: '5,000.00',
          total: '10,000.00',
          percentage: '50',
        },
        {
          iconUrl: '/assets/gift.svg',
          title: 'Charity',
          used: '500.00',
          total: '5,000.00',
          percentage: '10',
        },
        {
          iconUrl: '/assets/smile.svg',
          title: 'Entertainment',
          used: '1,250.00',
          total: '5,000.00',
          percentage: '25',
        },
        {
          iconUrl: '/assets/send.svg',
          title: 'Transfers',
          used: '750.00',
          total: '5,000.00',
          percentage: '15',
        },
        {
          iconUrl: '/assets/miscell.svg',
          title: 'Miscellaneous',
          used: '1,400.00',
          total: '10,000.00',
          percentage: '14',
        },
      ],
    },
    quickActions: [
      {
        buttonLabel: 'Pay bills',
      },
      {
        buttonLabel: 'Transfer',
      },
      {
        buttonLabel: 'Payments',
      },
    ],
  },
}

export default data
