import React from 'react'
import { mount } from 'enzyme'
import { ManageAlertsDetails } from '../index'
import { AppContainer, nextScreen, beforeEachHelper, WrapperType } from '../../../test/helper'
import DashboardLeftSidebar from '../../../components/DashboardLeftSidebar'
import NormalTab from '../../../components/NormalTab'
import { ASF } from '../../../common/Api/Services/ApiServiceFactory'

jest.mock('../../../common/Api/Services/EventSubscriptionFiltrationService', () => {
  return {}
})

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

jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useSelector: () => null,
  useDispatch: () => jest.fn(),
}))

describe('ManageAlertsDetails component testing', () => {
  let wrapper: WrapperType

  beforeEach(async () => {
    beforeEachHelper()
  })

  it('Should renders without crashing', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve) => {
          resolve({
            body: {
              payment_alerts: [
                {
                  alertConfId: 13,
                  channels: [],
                  userThresholdValue: {
                    thresholdId: 13,
                    currency: {
                      currencyId: 13,
                      currency: 'string',
                      currencySymbol: 'string',
                      active: true,
                    },
                    thresholdValue: 13,
                    lastThresholdValue: 13,
                    createdOn: '2012-12-12',
                  },
                  alert: {
                    alert: 'string',
                    alertDescription: 'string',
                    valueEditable: false,
                    event: 'string',
                  },
                  updating: true,
                  active: true,
                },
              ],
              account_alerts: [
                {
                  accountId: 'string',
                  accountType: 'string',
                  customerUniqueId: 'string',
                  alerts: [
                    {
                      alertConfId: 13,
                      channels: [],
                      userThresholdValue: {
                        thresholdId: 13,
                        currency: {
                          currencyId: 13,
                          currency: 'string',
                          currencySymbol: 'string',
                          active: true,
                        },
                        thresholdValue: 13,
                        lastThresholdValue: 13,
                        createdOn: '2012-12-12',
                      },
                      alert: {
                        alert: 'string',
                        alertDescription: 'string',
                        valueEditable: false,
                        event: 'string',
                      },
                      updating: true,
                      active: true,
                    },
                  ],
                },
              ],
            },
          })
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <ManageAlertsDetails />
      </AppContainer>
    )
    await nextScreen(wrapper)

    expect(wrapper).not.toEqual(undefined)
  })

  it('Should remove dashboard class when unmoute', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve) => {
          resolve({
            body: {
              payment_alerts: [
                {
                  alertConfId: 13,
                  channels: [],
                  userThresholdValue: {
                    thresholdId: 13,
                    currency: {
                      currencyId: 13,
                      currency: 'string',
                      currencySymbol: 'string',
                      active: true,
                    },
                    thresholdValue: 13,
                    lastThresholdValue: 13,
                    createdOn: '2012-12-12',
                  },
                  alert: {
                    alert: 'string',
                    alertDescription: 'string',
                    valueEditable: false,
                    event: 'string',
                  },
                  updating: true,
                  active: true,
                },
              ],
              account_alerts: [
                {
                  accountId: 'string',
                  accountType: 'string',
                  customerUniqueId: 'string',
                  alerts: [
                    {
                      alertConfId: 13,
                      channels: [],
                      userThresholdValue: {
                        thresholdId: 13,
                        currency: {
                          currencyId: 13,
                          currency: 'string',
                          currencySymbol: 'string',
                          active: true,
                        },
                        thresholdValue: 13,
                        lastThresholdValue: 13,
                        createdOn: '2012-12-12',
                      },
                      alert: {
                        alert: 'string',
                        alertDescription: 'string',
                        valueEditable: false,
                        event: 'string',
                      },
                      updating: true,
                      active: true,
                    },
                  ],
                },
              ],
            },
          })
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <ManageAlertsDetails />
      </AppContainer>
    )

    await nextScreen(wrapper)

    // const element = document.getElementById('root')
    // if (element) {
    //   expect(element.className).not.toContain('dashboard')
    // }
  })

  it('Should only change individual business if it is individual or business', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve, reject) => {
          reject('An Error')
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <ManageAlertsDetails />
      </AppContainer>
    )

    await nextScreen(wrapper)
    // @ts-ignore
    wrapper.find(DashboardLeftSidebar).props().setIndividualBusiness('notfound')
    await nextScreen(wrapper)
  })

  it('Should select tab when click mobile tab', async () => {
    const mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve) => {
          resolve({
            body: {
              payment_alerts: [
                {
                  alertConfId: 13,
                  channels: [],
                  userThresholdValue: {
                    thresholdId: 13,
                    currency: {
                      currencyId: 13,
                      currency: 'string',
                      currencySymbol: 'string',
                      active: true,
                    },
                    thresholdValue: 13,
                    lastThresholdValue: 13,
                    createdOn: '2012-12-12',
                  },
                  alert: {
                    alert: 'string',
                    alertDescription: 'string',
                    valueEditable: false,
                    event: 'string',
                  },
                  updating: true,
                  active: true,
                },
              ],
              account_alerts: [
                {
                  accountId: 'string',
                  accountType: 'string',
                  customerUniqueId: 'string',
                  alerts: [
                    {
                      alertConfId: 13,
                      channels: [],
                      userThresholdValue: {
                        thresholdId: 13,
                        currency: {
                          currencyId: 13,
                          currency: 'string',
                          currencySymbol: 'string',
                          active: true,
                        },
                        thresholdValue: 13,
                        lastThresholdValue: 13,
                        createdOn: '2012-12-12',
                      },
                      alert: {
                        alert: 'string',
                        alertDescription: 'string',
                        valueEditable: false,
                        event: 'string',
                      },
                      updating: true,
                      active: true,
                    },
                  ],
                },
              ],
            },
          })
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <ManageAlertsDetails />
      </AppContainer>
    )
    await nextScreen(wrapper)

    // @ts-ignore
    wrapper.find(NormalTab).props().clickTab('Account')
    await nextScreen(wrapper)
  })

  // it('Should select account', async () => {
  //   const mockStaticFunction = jest.fn()
  //   mockStaticFunction.mockReturnValueOnce({
  //     getViews: () => {
  //       return new Promise((resolve, reject) => {
  //         resolve({
  //           body: {
  //             payment_alerts: [
  //               {
  //                 alertConfId: 13,
  //                 channels: [],
  //                 userThresholdValue: {
  //                   thresholdId: 13,
  //                   currency: {
  //                     currencyId: 13,
  //                     currency: 'string',
  //                     currencySymbol: 'string',
  //                     active: true,
  //                   },
  //                   thresholdValue: 13,
  //                   lastThresholdValue: 13,
  //                   createdOn: '2012-12-12',
  //                 },
  //                 alert: {
  //                   alert: 'string',
  //                   alertDescription: 'string',
  //                   valueEditable: false,
  //                   event: 'string',
  //                 },
  //                 updating: true,
  //                 active: true,
  //               },
  //             ],
  //             account_alerts: [
  //               {
  //                 accountId: 'string',
  //                 accountType: 'string',
  //                 customerUniqueId: 'string',
  //                 alerts: [
  //                   {
  //                     alertConfId: 13,
  //                     channels: [],
  //                     userThresholdValue: {
  //                       thresholdId: 13,
  //                       currency: {
  //                         currencyId: 13,
  //                         currency: 'string',
  //                         currencySymbol: 'string',
  //                         active: true,
  //                       },
  //                       thresholdValue: 13,
  //                       lastThresholdValue: 13,
  //                       createdOn: '2012-12-12',
  //                     },
  //                     alert: {
  //                       alert: 'string',
  //                       alertDescription: 'string',
  //                       valueEditable: false,
  //                       event: 'string',
  //                     },
  //                     updating: true,
  //                     active: true,
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         })
  //       })
  //     },
  //     getHistory: () => {
  //       return new Promise((resolve, reject) => {
  //         reject('An Error')
  //       })
  //     },
  //   })

  //   ASF.getService = mockStaticFunction

  //   wrapper = mount(
  //     <AppContainer>
  //       <ManageAlertsDetails />
  //     </AppContainer>
  //   )
  //   await nextScreen(wrapper)

  //   // @ts-ignore
  //   wrapper.find(NormalTab).props().clickTab('Account')
  //   await nextScreen(wrapper)

  //   // @ts-ignore
  //   wrapper.find(AlertsSelectAccount).props().selectAccount(0)
  //   await nextScreen(wrapper)

  //   mockStaticFunction.mockReturnValueOnce({
  //     getViews: () => {
  //       return new Promise((resolve, reject) => {
  //         reject('An Error')
  //       })
  //     },
  //     getHistory: () => {
  //       return new Promise((resolve, reject) => {
  //         reject('An Error')
  //       })
  //     },
  //   })

  //   ASF.getService = mockStaticFunction

  //   // @ts-ignore
  //   wrapper.find(AccountAlertsDetails).props().onUpdated()
  //   await nextScreen(wrapper)
  // })

  it('Should update dashboard left bar title', async () => {
    let mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve) => {
          resolve({
            body: {
              payment_alerts: [
                {
                  alertConfId: 13,
                  channels: [],
                  userThresholdValue: {
                    thresholdId: 13,
                    currency: {
                      currencyId: 13,
                      currency: 'string',
                      currencySymbol: 'string',
                      active: true,
                    },
                    thresholdValue: 13,
                    lastThresholdValue: 13,
                    createdOn: '2012-12-12',
                  },
                  alert: {
                    alert: 'string',
                    alertDescription: 'string',
                    valueEditable: false,
                    event: 'string',
                  },
                  updating: true,
                  active: true,
                },
              ],
              account_alerts: [
                {
                  accountId: 'string',
                  accountType: 'string',
                  customerUniqueId: 'string',
                  alerts: [
                    {
                      alertConfId: 13,
                      channels: [],
                      userThresholdValue: {
                        thresholdId: 13,
                        currency: {
                          currencyId: 13,
                          currency: 'string',
                          currencySymbol: 'string',
                          active: true,
                        },
                        thresholdValue: 13,
                        lastThresholdValue: 13,
                        createdOn: '2012-12-12',
                      },
                      alert: {
                        alert: 'string',
                        alertDescription: 'string',
                        valueEditable: false,
                        event: 'string',
                      },
                      updating: true,
                      active: true,
                    },
                  ],
                },
              ],
            },
          })
        })
      },
      getHistory: () => {
        return new Promise((resolve) => {
          resolve([])
        })
      },
    })

    ASF.getService = mockStaticFunction

    wrapper = mount(
      <AppContainer>
        <ManageAlertsDetails />
      </AppContainer>
    )
    await nextScreen(wrapper)

    global.innerWidth = 1000
    await nextScreen(wrapper)
    // @ts-ignore
    expect(wrapper.find(DashboardLeftSidebar).props().title).toEqual('Manage Alerts')

    mockStaticFunction = jest.fn()
    mockStaticFunction.mockReturnValueOnce({
      getViews: () => {
        return new Promise((resolve) => {
          resolve({
            body: {
              payment_alerts: [
                {
                  alertConfId: 13,
                  channels: [],
                  userThresholdValue: {
                    thresholdId: 13,
                    currency: {
                      currencyId: 13,
                      currency: 'string',
                      currencySymbol: 'string',
                      active: true,
                    },
                    thresholdValue: 13,
                    lastThresholdValue: 13,
                    createdOn: '2012-12-12',
                  },
                  alert: {
                    alert: 'string',
                    alertDescription: 'string',
                    valueEditable: false,
                    event: 'string',
                  },
                  updating: true,
                  active: true,
                },
              ],
              account_alerts: [
                {
                  accountId: 'string',
                  accountType: 'string',
                  customerUniqueId: 'string',
                  alerts: [
                    {
                      alertConfId: 13,
                      channels: [],
                      userThresholdValue: {
                        thresholdId: 13,
                        currency: {
                          currencyId: 13,
                          currency: 'string',
                          currencySymbol: 'string',
                          active: true,
                        },
                        thresholdValue: 13,
                        lastThresholdValue: 13,
                        createdOn: '2012-12-12',
                      },
                      alert: {
                        alert: 'string',
                        alertDescription: 'string',
                        valueEditable: false,
                        event: 'string',
                      },
                      updating: true,
                      active: true,
                    },
                  ],
                },
              ],
            },
          })
        })
      },
      getHistory: () => {
        return new Promise((resolve) => {
          resolve([])
        })
      },
    })

    ASF.getService = mockStaticFunction

    global.innerWidth = 700
    // await nextScreen(wrapper)
    // // @ts-ignore
    // expect(wrapper.find(DashboardLeftSidebar).props().title).toEqual('Payment Alerts')
    // // @ts-ignore
    // wrapper.find(PaymentAlertsDetails).props().onUpdated()

    // mockStaticFunction = jest.fn()
    // mockStaticFunction.mockReturnValueOnce({
    //   getViews: () => {
    //     return new Promise((resolve, reject) => {
    //       resolve({
    //         body: {
    //           payment_alerts: [
    //             {
    //               alertConfId: 13,
    //               channels: [],
    //               userThresholdValue: {
    //                 thresholdId: 13,
    //                 currency: {
    //                   currencyId: 13,
    //                   currency: 'string',
    //                   currencySymbol: 'string',
    //                   active: true,
    //                 },
    //                 thresholdValue: 13,
    //                 lastThresholdValue: 13,
    //                 createdOn: '2012-12-12',
    //               },
    //               alert: {
    //                 alert: 'string',
    //                 alertDescription: 'string',
    //                 valueEditable: false,
    //                 event: 'string',
    //               },
    //               updating: true,
    //               active: true,
    //             },
    //           ],
    //           account_alerts: [
    //             {
    //               accountId: 'string',
    //               accountType: 'string',
    //               customerUniqueId: 'string',
    //               alerts: [
    //                 {
    //                   alertConfId: 13,
    //                   channels: [],
    //                   userThresholdValue: {
    //                     thresholdId: 13,
    //                     currency: {
    //                       currencyId: 13,
    //                       currency: 'string',
    //                       currencySymbol: 'string',
    //                       active: true,
    //                     },
    //                     thresholdValue: 13,
    //                     lastThresholdValue: 13,
    //                     createdOn: '2012-12-12',
    //                   },
    //                   alert: {
    //                     alert: 'string',
    //                     alertDescription: 'string',
    //                     valueEditable: false,
    //                     event: 'string',
    //                   },
    //                   updating: true,
    //                   active: true,
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       })
    //     })
    //   },
    //   getHistory: () => {
    //     return new Promise((resolve, reject) => {
    //       resolve([])
    //     })
    //   },
    // })

    // ASF.getService = mockStaticFunction

    // global.innerWidth = 700
    // await nextScreen(wrapper)
    // // @ts-ignore
    // expect(wrapper.find(DashboardLeftSidebar).props().title).toEqual('Alert History')
  })
})
