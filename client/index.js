import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import App from './components/App'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:4000/graphql')
)
ReactDOM.render(
  <Relay.RootContainer
    Component={App.Container}
    route={App.queries}
  />,
  document.getElementById('root')
)