import React from 'react'
import Relay, {createContainer} from 'react-relay'

const TopicThumbnail = ({thumbnail}) => (
  <div>
    <h2>{thumbnail.title}</h2>
    <h4>{thumbnail.author.name}</h4>
  </div>
)

export default createContainer(TopicThumbnail, {
  fragments: {
    thumbnail: () => Relay.QL`
       fragments on Topic {
         id
         title
         author {
           name
         }
       }
    `
  }
})