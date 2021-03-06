/*
 * Copyright (c) 2017 Topcoder, Inc. All rights reserved.
 */

/*
 * App configurations
 */

export const API_URL = ''

export const META = {
  PAGE_TITLE_SUFFIX: 'Odyssey OLB',
  PAGE_DESCRIPTION: 'Odyssey OLB',
  PAGE_KEYWORDS: 'Odyssey OLB',
}

export const DEFAULT_SERVER_ERROR = 'There was an error processing your request.'

export const STATUS_OK = 200

export const GOOGLE_KEY = '6LclyZcUAAAAAOwb032rwe_IKHaE0A6QxBFgPgiJ'

export const otpExpireTime = '30'

export const noActivity = {
  notificationTimeout: 1000 * 60000, // 600 seconds
  logoutTimeout: 1000 * 120, // 120 seconds
}

export const contactRMReviewSortByDropdownOptions = ['Newest', 'Oldest']
export const contactRMReviewRatingByDropdownOptions = [
  'All Ratings',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
]

export const tabArrayHelpSupport = ['FAQ', 'Contact Bank', 'Regional Office Addresses']

export const tabArrayHelpSupportContactBank = ['Call', 'Secure Email']

export const accountAlertsSettings = [
  {
    label: 'pay_at_maturity',
  },
  {
    label: 'reinvest_total',
  },
  {
    label: 'reinvest_partial',
  },
]

export const quickActionsMenuSettings = {
  mainMenu: [
    {
      iconName: 'payment',
      optionLabel: 'payment_and_transfer',
      descriptionLabel: 'make_a_payment_and_transaction',
    },
    {
      iconName: 'management',
      optionLabel: 'account_management',
      descriptionLabel: 'manage_your_account',
    },
  ],
  accountMenuClosed: [
    {
      groupTitle: '',
      optionList: [
        {
          iconUrl: '/assets/green-load.svg',
          optionLabel: 'eStatements',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/icon-management.svg',
          optionLabel: 'account_management',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/green-request.svg',
          optionLabel: 'reactive_account',
          individualBusiness: '',
          pageUrl: '',
        },
      ],
    },
  ],
  paymentAndTransfer: [
    {
      groupTitle: 'payment',
      optionList: [
        {
          iconUrl: '/assets/transfer-between-green.svg',
          optionLabel: 'transfer_between_accounts',
          individualBusiness: '',
          pageUrl: '/movePaymentPages/transferBetweenAccounts',
        },
        {
          iconUrl: '/assets/green-change.svg',
          optionLabel: 'make_a_payment',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/approve-blue.svg',
          optionLabel: 'approve_transactions',
          individualBusiness: 'business',
          pageUrl: '/movePaymentPages/approveTransactions',
        },
        {
          iconUrl: '/assets/online-green.svg',
          optionLabel: 'online_transaction_status',
          individualBusiness: '',
          pageUrl: '/movePaymentPages/onlineTransactionStatus',
        },
      ],
    },
    {
      groupTitle: 'management',
      optionList: [
        {
          iconUrl: '/assets/green-card.svg',
          optionLabel: 'manage_direct_debits',
          individualBusiness: '',
          pageUrl: '/movePaymentPages/manageDirectDebits',
        },
        {
          iconUrl: '/assets/green-order.svg',
          optionLabel: 'manage_standing_orders',
          individualBusiness: '',
          pageUrl: '/movePaymentPages/manageStandingOrders',
        },
        {
          iconUrl: '/assets/green-payee.svg',
          optionLabel: 'manage_payees',
          individualBusiness: '',
          pageUrl: '/movePaymentPages/managePayees',
        },
        {
          iconUrl: '/assets/payment-alert.svg',
          optionLabel: 'manage_template',
          individualBusiness: 'business',
          pageUrl: '/movePaymentPages/managePaymentTemplate',
        },
      ],
    },
  ],
  accountManagement: [
    {
      groupTitle: '',
      optionList: [
        {
          iconUrl: '/assets/account-man.svg',
          optionLabel: 'account_information',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/green-change.svg',
          optionLabel: 'change_nominated',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/green-email.svg',
          optionLabel: 'order_cheque_books',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/green-order.svg',
          optionLabel: 'order_giro_books',
          individualBusiness: '',
          pageUrl: '',
        },
        {
          iconUrl: '/assets/green-view.svg',
          optionLabel: 'view_account_analysis',
          individualBusiness: '',
          pageUrl: '/accountsDashboardPage/transactionHistory',
        },
        {
          iconUrl: '/assets/green-request.svg',
          optionLabel: 'request_closure',
          individualBusiness: '',
          pageUrl: '',
        },
      ],
    },
  ],
}

export const quickActionsConfirmModalSettings = {
  nominatedChanged: {
    title: 'nominated_changed',
    content: 'nominated_changed_request_submitted_description',
  },
  orderChequeBooksRequestSubmitted: {
    title: 'request_submitted',
    content: 'cheque_books_request_submitted_description',
  },
  orderGiroBooksRequestSubmitted: {
    title: 'request_submitted',
    content: 'giro_books_request_submitted_description',
  },
  reactiveAccountRequestSubmitted: {
    title: 'reactivated_successfully',
    content: 'reactive_account_request_submitted_description',
  },
}

export const contactBankSecureEmailDetailsSettings = [
  {
    iconName: 'unread',
    menuLabel: 'mark_as_unread',
  },
  {
    iconName: 'trash',
    menuLabel: 'trash',
  },
  {
    iconName: 'delete',
    menuLabel: 'delete',
  },
]

export const dashboardLeftCarouselData = [
  {
    imgUrl: '/assets/left-control-bgimg.jpg',
    titleLeft: 'our',
    titleMiddle: '£1M',
    titleRight: 'lending_fund',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/faster-bgimg.jpg',
    titleLeft: 'faster',
    titleMiddle: 'small_business',
    titleRight: 'loan_applications_for',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/faster-bgimg.jpg',
    titleLeft: 'faster',
    titleMiddle: 'small_business',
    titleRight: 'loan_applications',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/faster-bgimg.jpg',
    titleLeft: 'faster',
    titleMiddle: 'small_business',
    titleRight: 'loan',
    buttonText: 'apply_now',
  },
]

export const dashboardRightCarouselData = [
  {
    imgUrl: '/assets/right-control-bgimg.jpg',
    title: 'business_insurance',
    description: 'you_need_quickly',
    bottomLeftText: 'claim_up',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/export-bg-img.jpg',
    title: 'export_invoice_finance',
    description: 'raise_cash_from',
    bottomLeftText: '',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/export-bg-img.jpg',
    title: 'export_invoice_finance',
    description: 'raise_cash_from_two',
    bottomLeftText: '',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/export-bg-img.jpg',
    title: 'export_invoice_finance',
    description: 'raise_cash_from_three',
    bottomLeftText: '',
    buttonText: 'apply_now',
  },
]

export const homeMainBannerData = [
  {
    imgUrl: '/assets/move-money-img01.jpg',
    title: 'new_to_loan',
    description: 'bank_serving_needs',
    bottomText: 'borrow_up',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/move-money-img01.jpg',
    title: 'new',
    description: 'bank_serving_needs_two',
    bottomText: 'borrow_up_to',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/move-money-img01.jpg',
    title: 'new_to_loan',
    description: 'bank_serving_needs',
    bottomText: 'borrow_up_three',
    buttonText: 'apply_now',
  },
  {
    imgUrl: '/assets/move-money-img01.jpg',
    title: 'new_to_loan',
    description: 'bank_serving_needs',
    bottomText: 'borrow_up_one',
    buttonText: 'apply_now',
  },
]

export const movePaymentTransferBetweenAccountsProgressSteps = [
  {
    title: 'select_account',
    description: 'select_account_description',
  },
  {
    title: 'to_account',
    description: 'to_account_description',
  },
  {
    title: 'transfer_amount',
    description: 'transfer_amount_description',
  },
  {
    title: 'account_reference',
    description: 'account_reference_description',
  },
  {
    title: 'review_and_confirm',
    description: 'review_and_confirm_description',
  },
]

export const movePaymentMakeAPaymentNewPayeeProgressSteps = [
  {
    title: 'select_account',
    description: 'select_account_and_payment_type_description',
  },
  {
    title: 'payment_type',
    description: 'payment_type_description',
  },
  {
    title: 'select_payee',
    description: 'select_payee_description',
  },
  {
    title: 'select_date',
    description: 'select_date_description',
  },
  {
    title: 'review_and_confirm',
    description: 'review_and_confirm_description',
  },
]

export const movePaymentMakeAPaymentExistingPayeeProgressSteps = [
  {
    title: 'select_account',
    description: 'select_account_and_payment_type_description',
  },
  {
    title: 'select_existing_payee',
    description: 'select_existing_payee_description',
  },
  {
    title: 'select_amount',
    description: 'select_amount_description',
  },
  {
    title: 'select_date',
    description: 'select_date_description',
  },
  {
    title: 'review_and_confirm',
    description: 'review_and_confirm_description',
  },
]

export const timelineDropdownOptions = [
  'Last 30 days',
  'Last 90 days',
  'Last 180 days',
  'Last 365 days',
]

export const currencyOptions = ['Pound Sterling', 'Euro']

export const budgetCategoryDropdownOptions = [
  'Education',
  'Bills & Utilities',
  'Miscellaneous',
  'Travel',
  'Mortgage',
  'Charity',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Groceries',
  'Transfers',
]

export const budgetFrequencyDropdownOptions = [
  'Next 7 Days',
  'Next 30 Days',
  'Next 90 Days',
  'Next 180 Days',
  'Next 365 Days',
]

export const accountTypeDropdownOptions = [
  'Select Account',
  'Current Account',
  'Saving Account',
  'Other Account',
]

export const typeOfTransactionDropdownOptions = ['Transaction Type', 'Credit', 'Type 1', 'Type 2']

export const typeOfEStatementsDropdownOptions = [
  {
    optionLabel: 'eStatement',
    disabled: false,
  },
  {
    optionLabel: 'Statement of Interest',
    disabled: false,
  },
  {
    optionLabel: 'Statement of Fee',
    disabled: true,
  },
]

export const yearsOfEStatementsDropdownOptions = [
  {
    optionLabel: '2019',
    isNotAvailiable: false,
  },
  {
    optionLabel: '2018',
    isNotAvailiable: false,
  },
  {
    optionLabel: '2017',
    isNotAvailiable: true,
  },
  {
    optionLabel: '2016',
    isNotAvailiable: true,
  },
  {
    optionLabel: '2015',
    isNotAvailiable: true,
  },
  {
    optionLabel: '2014',
    isNotAvailiable: false,
  },
  {
    optionLabel: '2013',
    isNotAvailiable: true,
  },
]

export const monthListArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const downloadAsDropdownOptions = [
  {
    iconUrl: '/assets/clearance-status.svg',
    value: 'PDF',
  },
  {
    iconUrl: '/assets/clearance-status.svg',
    value: 'CSV',
  },
  {
    iconUrl: '/assets/clearance-status.svg',
    value: 'Quick Book',
  },
  {
    iconUrl: '/assets/clearance-status.svg',
    value: 'Xero',
  },
  {
    iconUrl: '/assets/clearance-status.svg',
    value: 'Intuit',
  },
]

export const monthFilterDropdownOptions = ['Last 3 months', 'Last 6 months', 'Last 12 months']

export const movePaymentFrequencyDropdownOptions = ['Weekly', 'Monthly', 'Yearly']

export const movePaymentSelectDurationDropdownOptions = [
  'Last 20 transactions',
  'Last 50 transactions',
  'Last 100 transactions',
]

export const movePaymentSelectAccountDropdownOptions = ['All GBP', 'Expenses', 'Fix Bond']

export const movePaymentSelectPaymentFileDropdownOptions = ['All', 'Option 1', 'Option 2']

export const homeMainBannerNavigationList = [
  {
    sectionTitle: 'payments',
    optionsList: [
      {
        title: 'transfer_between',
        description: 'transaction_between',
        iconUrl: '/assets/transfer-between.svg',
        pageUrl: '/movePaymentPages/transferBetweenAccounts',
        bottomButtonLabel: '',
      },
      {
        title: 'make_a_payment',
        description: 'make_any_payment',
        iconUrl: '/assets/make-payment-blue.svg',
        pageUrl: '/movePaymentPages/makeAPayment',
        bottomButtonLabel: '',
      },
      {
        title: 'approve_transactions',
        description: 'update_standing',
        iconUrl: '/assets/approve-blue.svg',
        pageUrl: '/movePaymentPages/approveTransactions',
        bottomButtonLabel: '',
        individualBusiness: 'business',
      },
      {
        title: 'transaction_status',
        description: 'access_the_status',
        iconUrl: '/assets/online-blue.svg',
        pageUrl: '/movePaymentPages/onlineTransactionStatus',
        bottomButtonLabel: '',
      },
    ],
  },
  {
    sectionTitle: 'management',
    optionsList: [
      {
        title: 'manage_direct_debits',
        description: 'view_activate',
        iconUrl: '/assets/direct-blue.svg',
        pageUrl: '/movePaymentPages/manageDirectDebits',
        bottomButtonLabel: '',
      },
      {
        title: 'manage_standing_orders',
        description: 'set_scheduled',
        iconUrl: '/assets/standing-blue.svg',
        pageUrl: '/movePaymentPages/manageStandingOrders',
        bottomButtonLabel: '',
      },

      {
        title: 'manage_payees',
        description: 'set_payees',
        iconUrl: '/assets/payee-blue.svg',
        pageUrl: '/movePaymentPages/managePayees',
        bottomButtonLabel: '',
      },
      {
        title: 'manage_template',
        description: 'make_payment_faster',
        iconUrl: '/assets/payment-alert.svg',
        pageUrl: '/movePaymentPages/managePaymentTemplate',
        bottomButtonLabel: '',
        individualBusiness: 'business',
      },
    ],
  },
]

export const phonePrefixDropdownOptions = [
  '+1',
  '+1',
  '+7',
  '+20',
  '+27',
  '+30',
  '+31',
  '+32',
  '+33',
  '+34',
  '+36',
  '+39',
  '+40',
  '+41',
  '+43',
  '+44',
  '+45',
  '+46',
  '+47',
  '+48',
  '+49',
  '+51',
  '+52',
  '+53',
  '+54',
  '+55',
  '+56',
  '+57',
  '+58',
  '+60',
  '+61',
  '+62',
  '+63',
  '+64',
  '+65',
  '+66',
  '+81',
  '+82',
  '+84',
  '+86',
  '+90',
  '+91',
  '+92',
  '+93',
  '+94',
  '+95',
  '+98',
  '+212',
  '+213',
  '+216',
  '+218',
  '+220',
  '+221',
  '+223',
  '+224',
  '+225',
  '+226',
  '+227',
  '+228',
  '+229',
  '+230',
  '+231',
  '+232',
  '+233',
  '+233',
  '+234',
  '+235',
  '+236',
  '+237',
  '+239',
  '+241',
  '+242',
  '+243',
  '+244',
  '+247',
  '+248',
  '+249',
  '+251',
  '+252',
  '+253',
  '+254',
  '+255',
  '+256',
  '+257',
  '+258',
  '+260',
  '+261',
  '+262',
  '+263',
  '+264',
  '+265',
  '+266',
  '+267',
  '+268',
  '+327',
  '+331',
  '+350',
  '+351',
  '+352',
  '+353',
  '+354',
  '+355',
  '+356',
  '+357',
  '+358',
  '+359',
  '+370',
  '+371',
  '+372',
  '+373',
  '+374',
  '+375',
  '+376',
  '+377',
  '+378',
  '+380',
  '+381',
  '+386',
  '+420',
  '+421',
  '+423',
  '+501',
  '+502',
  '+503',
  '+504',
  '+505',
  '+506',
  '+507',
  '+509',
  '+591',
  '+592',
  '+593',
  '+594',
  '+595',
  '+596',
  '+597',
  '+598',
  '+599',
  '+673',
  '+674',
  '+675',
  '+676',
  '+677',
  '+679',
  '+682',
  '+684',
  '+685',
  '+689',
  '+850',
  '+852',
  '+853',
  '+855',
  '+856',
  '+880',
  '+886',
  '+960',
  '+961',
  '+962',
  '+963',
  '+964',
  '+965',
  '+966',
  '+967',
  '+968',
  '+971',
  '+972',
  '+973',
  '+974',
  '+976',
  '+977',
  '+992',
  '+993',
  '+994',
  '+995',
  '+1242',
  '+1246',
  '+1264',
  '+1268',
  '+1345',
  '+1441',
  '+1664',
  '+1670',
  '+1671',
  '+1758',
  '+1758',
  '+1784',
  '+1784',
  '+1787',
  '+1809',
  '+1809',
  '+1876',
  '+1890',
]

/**
 * global config
 */
export const GLOBAL_CONFIG = {
  BASE_API_PATH: 'http://35.223.1.37',
  APP_ID: '/app/one',
  CYN_WEB: 'CYN_WEB',
  E_IV: 'AODVNUASDNVVAOVF',
  E_KEY: 'mykey@91mykey@91',
  BOTH: 'BOTH',
}

/**
 * common date format
 */
export const DATE_FMT = 'MMM DD, YYYY'

/**
 * common date time fmt
 */
export const DATE_TIME_FMT = 'DD MMM YYYY, hh:mm A'
