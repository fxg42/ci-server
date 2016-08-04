import React from 'react'
import ReactDOM from 'react-dom'
import RootReducer from './reducers/index'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from './actions/index'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import RootComponent from './components/Root'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTouchTapEvent from 'react-tap-event-plugin'

const main = () => {
  injectTouchTapEvent()

  const store = createStore(RootReducer, applyMiddleware(thunk, createLogger()))

  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RootComponent />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
  )

  store.dispatch(actions.findAllProjects())
  setInterval(() => {
    store.dispatch(actions.findAllProjects())
  }, 2000)
}

document.addEventListener('DOMContentLoaded', main)
