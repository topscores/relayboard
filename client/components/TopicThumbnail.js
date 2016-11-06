import React from 'react'
import Relay, {createContainer} from 'react-relay'

const TopicThumbnail = ({thumbnail}) => (
  <div>
    <h2>{thumbnail.title}</h2>
    <h3>{thumbnail.author.name}</h3>
  </div>
)

export default createContainer(TopicThumbnail, {
  fragments: {
    thumbnail: () => Relay.QL`
      fragment on Topic {
        id
        title
        author {
          name
        }
      }
    `
  }
})