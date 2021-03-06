/* eslint-disable max-len */
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { MemoryRouter, Route } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { ReactWrapper, HTMLAttributes } from 'enzyme'

import configureStore from 'redux-mock-store'

export type WrapperType = ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>

type AppContainerProps = {
  children: React.ReactNode
  initialEntries?: string[]
  path?: string
}
const mockStore = configureStore([thunk])

export const initialState = {}
/**
 * App container to display test component
 * @param props contain children component
 */
export const AppContainer = ({
  children,
  initialEntries = ['/'],
  path = '/',
}: AppContainerProps) => {
  return (
    <Provider store={mockStore(initialState)}>
      <MemoryRouter initialEntries={initialEntries}>
        <Route path={path} component={() => <div id="root">{children}</div>} />
      </MemoryRouter>
    </Provider>
  )
}

export const AppContainerSuspense = ({
  children,
  initialEntries = ['/'],
  path = '/',
}: AppContainerProps) => {
  return (
    <Suspense fallback="loading">
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={initialEntries}>
          <Route path={path} component={() => <div id="root">{children}</div>} />
        </MemoryRouter>
      </Provider>
    </Suspense>
  )
}

/**
 * Go to next screen
 * @param wrapper wrapper
 * @param timeout timeout before go to next screen
 */
export const nextScreen = async (wrapper: WrapperType, timeout = 0) => {
  await act(async () => {
    if (timeout) {
      jest.setTimeout(timeout)
    } else {
      jest.runOnlyPendingTimers()
    }
  })
  wrapper.update()
}

/**
 * Get mouse event default
 */
export const getMouseEventDefault = (): React.MouseEvent<HTMLElement> => {
  const preventDefault = jest.fn() as () => void // fake prevent default method
  const stopPropagation = jest.fn() as () => void // fake stop propagation method

  return {
    stopPropagation,
    preventDefault,
  } as React.MouseEvent<HTMLElement>
}

/**
 * Click to element
 * @param element element need to click
 * @param event event when click
 */
export const onClick = (
  element: ReactWrapper<HTMLAttributes, any>,
  event: React.MouseEvent<HTMLElement> = getMouseEventDefault()
) => {
  const onClickAction = element.props().onClick
  onClickAction!(event)
}

/**
 * On Change event of element
 * @param element element need to click
 * @param event event when click, cast to any because there a lot of type of onChange event
 */
export const onChange = (element: ReactWrapper<HTMLAttributes, any>, event: any) => {
  element.simulate('change', event)
}

/**
 * On keydown event of element
 * @param element element need to click
 * @param keyCode key code
 */
export const onKeydown = (element: ReactWrapper<HTMLAttributes, any>, keyCode: number) => {
  element.simulate('keydown', { keyCode })
}

export const beforeEachHelper = () => {
  localStorage.clear()
  if (!document.getElementById('root')) {
    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)
  }

  jest.clearAllMocks()
  jest.useFakeTimers()
  simulateNetworkSuccess()
}

/**
 * Switch to network error
 */
export const simulateNetworkError = () => {
  const axios = require('axios').default
  axios.switchToNetworkError()
}

/**
 * Switch to network success
 */
export const simulateNetworkSuccess = () => {
  const axios = require('axios').default
  axios.switchToNetworkSuccess()
}

export const dataActionMethods = [
  'getLoginHeaderData',
  'getOPTData',
  'getUnLockQuestionesData',
  'getDashboardHeaderData',
  'getCustomerDashboardData',
  'getAccountsDashboardData',
  'getTransactionHistoryData',
  'getManageCardData',
  'getManageAlertsData',
  'getAlertFAQsData',
  'getManageAlertsDetailsData',
  'getLoginData',
  'getRegistrationData',
  'getRecoverUserData',
  'getResetPasscodeData',
  'getServiceErrorData',
  'getFinanceManagerData',
  'getCustomerDashboardData',
  'getMarketingPreferencesData',
  'getHelpSupportData',
  'getEStatementsData',
]
