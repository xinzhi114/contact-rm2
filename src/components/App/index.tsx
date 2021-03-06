import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { AUTH_ROUTES } from '../../config/auth'
import { changeScreen } from '../../store/actions/analytics'
import { IAppState } from '../../store/constants'

export const App: React.FunctionComponent = ({ children }) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const redirectToDashboard = useSelector<IAppState>(
    (state) => state.auth.token !== null && state.auth.forceRedirect
  ) as boolean

  const redirectToLogin = useSelector<IAppState>((state) => state.auth.token === null) as boolean

  useEffect(() => {
    if (location.pathname) {
      let formattedPathname = ''
      if (location.pathname === '/') {
        formattedPathname = 'Login (/)'
      } else {
        formattedPathname = `${location.pathname
          .split('/')
          .filter((segment) => segment !== '')
          .map((segment) =>
            segment
              .replace(/[A-Z][A-Z]/g, (v) => `${v[0]} ${v[1]}`)
              .replace(/[a-z][A-Z]/g, (v) => `${v[0]} ${v[1]}`)
              .replace(/^[a-z]/g, (v: string) => v.toUpperCase())
          )
          .join(' - ')} (${location.pathname})`
      }
      dispatch(changeScreen(formattedPathname))
    }
  }, [location, dispatch])

  useEffect(() => {
    // Auth guard
    if (redirectToDashboard && AUTH_ROUTES.includes(location.pathname)) {
      history.push('/customerDashboard')
    } else if (redirectToLogin && !AUTH_ROUTES.includes(location.pathname)) {
      history.push('/')
    }
  }, [history, redirectToDashboard, redirectToLogin, location])

  return <div>{children}</div>
}
