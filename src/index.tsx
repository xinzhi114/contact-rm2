import 'babel-polyfill'
import 'whatwg-fetch'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'

import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import 'accessible-nprogress/dist/accessible-nprogress.min.css'
import store from './store/store'

// import i18n (needs to be bundled ;))
import { globalTExist, globalT } from './i18n'
import { ToastRoot } from './components/Toast'
import { App } from './components/App'
import './services/firebase/init'
import { ApiServiceProvider } from './common/Api/Services/ApiServiceProvider'
import { StorageService } from './services/api/StorageService'
import { Any } from './common/Api/Types'

// Api init
ApiServiceProvider.setStorageService(new StorageService())
ApiServiceProvider.setI18n({
  globalT,
  globalTExist,
})
ApiServiceProvider.navigate = (params: Any) => {
  if (params.routeName === 'login') {
    // window.location.href = '/'
  }
}
// -- end of Api init

// Helper function that renders single route
const renderRoute = (route: any, props: any) => {
  window.scrollTo(0, 0) // Reset scroll to top
  return <route.component routeParams={props.match.params} />
}

// Helper function that create all routes
const createRoutes = () =>
  routes.map((route) => (
    <Route
      exact
      key={route.path}
      path={route.path}
      component={(props: any) => renderRoute(route, props)}
    />
  ))

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <BrowserRouter>
        <App>{createRoutes()}</App>
      </BrowserRouter>
      <ToastRoot />
    </Provider>
  </Suspense>,
  document.getElementById('root')
)
