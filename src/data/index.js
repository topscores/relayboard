const authors = [
  {
    id: 1,
    name: 'Arnupharp Viratanapanu',
    address: 'Bangkok'
  },
  {
    id: 2,
    name: 'Donald Trunmp',
    address: 'USA'
  },
]

const topics = [
  {
    id: 1,
    title: 'Relay is awesome',
    author_id: 1,
  },
  {
    id: 2,
    title: 'Vote for me',
    author_id: 2,
  },
]

const comments = [
  {
    topic_id: 1,
    text: 'I think so',
    commentor_id: 2,
  },
  {
    topic_id: 2,
    text: 'nope',
    commentor_id: 1,
  }
]

export default {
  authors,
  topics,
  comments,
}