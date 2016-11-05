import React from 'react'
import Relay from 'react-relay'

const TopicThumbnail = ({edge}) => (
  <div>
    <h2>{edge.node.title}</h2>
    <h3>{edge.node.author.name}</h3>
  </div>
)

export default TopicThumbnail