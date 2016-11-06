import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import App from './components/App'

const queries = {
  name: 'TopicsQuery',
  params: {},
  queries: {
    topics: () => Relay.QL`query {
      topics
    }`,
    users: () => Relay.QL`query {
      users
    }`
  }
}
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:4000/graphql')
)
ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={queries}
  />,
  document.getElementById('root')
)