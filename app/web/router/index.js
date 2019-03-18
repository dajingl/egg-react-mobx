import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

import stores from '../stores'

import Home from '../page/home/index'
import Test from '../page/test/index'

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Switch>
        <Route component={Home} path="/home" />
        <Route component={Test} path="/test" />
      </Switch>
    </div>
  </BrowserRouter>
)

const App = () => (
  <Fragment>
    <Provider {...stores}>
      <Routes />
    </Provider>
    {
      process.env.NODE_ENV === 'development' ? (
        <DevTools />
      ) : null
    }
  </Fragment>
)

export default App
