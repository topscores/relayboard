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

export default queries