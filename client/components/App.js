import React from 'react'
import Relay, {createContainer} from 'react-relay'
import TopicThumbnail from './TopicThumbnail'

const App = ({topics}) => {
  return (
    <div>
      {topics.edges.map(({node}) => 
        <TopicThumbnail key={node.id} thumbnail={node} />
      )}
    </div>
  )
}

export default createContainer(App, {
  fragments: {
    topics: () => Relay.QL`
      fragment on TopicConnection {
        edges {
          node {
            ${TopicThumbnail.getFragment('thumbnail')}
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