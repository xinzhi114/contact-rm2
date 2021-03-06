export const data = {
  dataList: {
    profile: {
      photoUrl: '/assets/user-photo-03@2x.jpg',
      username: 'John Appleseed',
      usernameShort: 'John',
      usernameLabel: 'JA',
      accountType: 'Standard account',
    },
    lastLogin: '12 Oct 2020, 1:19:50 PM',
    notifications: {
      alerts: [
        {
          title: 'Payment alert',
          content: 'Your loan payment for <strong>#CI 4559 8997 689 8</strong> succesfully paid.',
          time: 'Aug 15, 2020, 9:35',
        },
        {
          title: 'High value transaction alert',
          content:
            'Transfer incoming <strong>£20,0154.00</strong> to your account <strong>#1094 4545  3121 01</strong>.',
          time: 'Aug 16, 2020, 9:35',
        },
        {
          title: 'Business Account',
          content:
            'We detected cash withdrawal <strong>£2,400.00</strong> from account <strong>#1094 4545 3121 01</strong>.',
          time: 'Aug 14, 2020, 9:35',
        },
      ],
      secureMessage: [
        {
          title: 'High value alert',
          content:
            'Transfer incoming <strong>£20,0154.00</strong> to your account <strong>#1094 4545  3121 01</strong>.',
          time: 'Aug 25, 2020, 8:35',
        },
        {
          title: 'Business Account',
          content:
            'We detected cash withdrawal <strong>£2,400.00</strong> from account <strong>#1094 4545 3121 01</strong>.',
          time: 'Aug 25, 2020, 6:35',
        },
      ],
    },
    currentPlanIndex: 1,
    availablePlanList: [
      {
        planName: 'Lite',
        price: '0',
        planItems: [
          {
            name: '£25,000 pm free local payment',
            enabled: true,
          },
          {
            name: 'Up to 3 team member permissions',
            enabled: true,
          },
          {
            name: 'Free international payments',
            enabled: false,
          },
          {
            name: 'Preferential overdraft rate',
            enabled: false,
          },
          {
            name: 'Preferential saving rate',
            enabled: false,
          },
          {
            name: 'Accounting integration',
            enabled: false,
          },
          {
            name: 'Payroll',
            enabled: false,
          },
          {
            name: 'Priority 24/7 support',
            enabled: false,
          },
        ],
      },
      {
        planName: 'Classic',
        price: '10',
        planItems: [
          {
            name: '£25,000 pm free local payment',
            enabled: true,
          },
          {
            name: 'Up to 20 team member permissions',
            enabled: true,
          },
          {
            name: '£10,000 pm free international payments',
            enabled: true,
          },
          {
            name: '-1% EAP preferential overdraft rate',
            enabled: true,
          },
          {
            name: '+0.25% preferential saving rate',
            enabled: true,
          },
          {
            name: 'Accounting integration',
            enabled: true,
          },
          {
            name: 'Payroll',
            enabled: true,
          },
          {
            name: 'Priority 24/7 support',
            enabled: false,
          },
        ],
      },
      {
        planName: 'Premium',
        price: '10',
        planItems: [
          {
            name: 'Unlimited',
            enabled: true,
          },
          {
            name: 'Unlimited',
            enabled: true,
          },
          {
            name: 'Unlimited',
            enabled: true,
          },
          {
            name: '-2% EAP preferential overdraft rate',
            enabled: true,
          },
          {
            name: '+0.50% preferential saving rate',
            enabled: true,
          },
          {
            name: 'Accounting integration',
            enabled: true,
          },
          {
            name: 'Payroll',
            enabled: true,
          },
          {
            name: 'Priority 24/7 support',
            enabled: true,
          },
        ],
      },
    ],
  },
}

export default data
