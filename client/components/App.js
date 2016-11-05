import React from 'react'
import Relay, {createContainer} from 'react-relay'
import TopicThumbnail from './TopicThumbnail'

const App = ({topics}) => {
  return (
    <div>
      {topics.edges.map(edge => 
        <TopicThumbnail edge={edge} />
      )}
    </div>
  )
}

const Container = createContainer(App, {
  fragments: {
    topics: () => Relay.QL`
      fragment on TopicConnection {
        edges {
          node {
            title
            author {
              name
            }
          }
        }
      }
    `,
    users: () => Relay.QL`
      fragment on UserConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `
  }
})

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

export default {
  Container,
  queries,
}