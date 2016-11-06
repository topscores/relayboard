import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import App from './components/App'
import TopicsQuery from './queries/TopicsQuery'


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:4000/graphql')
)
ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={TopicsQuery}
  />,
  document.getElementById('root')
)