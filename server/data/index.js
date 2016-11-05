class User {
  constructor({id, name}) {
    this.id = id
    this.name = name
  }
}

class Topic {
  constructor({id, title, author_id}) {
    this.id = id
    this.title = title
    this.author_id = author_id
  }
}

class Comment {
  constructor({id, topic_id, text, commentor_id}) {
    this.id = id
    this.topic_id = topic_id
    this.text = text
    this.commentor_id = commentor_id
  }
}

const users = [
  new User({
    id: 1,
    name: 'Arnupharp Viratanapanu',
  }),
  new User({
    id: 2,
    name: 'Donald Trunmp',
  }),
  new User({
    id: 3,
    name: 'Hillary Clinton',
  }),
  new User({
    id: 4,
    name: 'Bill Gate',
  }),
  new User({
    id: 5,
    name: 'Mark Zuck',
  }),
  new User({
    id: 6,
    name: 'Elon Musk',
  }),
  new User({
    id: 7,
    name: 'Brad pitt',
  }),
  new User({
    id: 8,
    name: 'Donal duck',
  }),
]

const topics = [
  new Topic({
    id: 1,
    title: 'Relay is awesome',
    author_id: 1,
  }),
  new Topic({
    id: 2,
    title: 'Vote for me',
    author_id: 2,
  }),
]

const comments = [
  new Comment({
    id: 1,
    topic_id: 1,
    text: 'I think so',
    commentor_id: 2,
  }),
  new Comment({
    id: 2,
    topic_id: 2,
    text: 'nope',
    commentor_id: 1,
  }),
]

const getUser = (id) => {
  users.find(user => user.id === id)
}

const getTopic = (id) => {
  topics.find(user => user.id === id)
}

const getComment = (id) => {
  comments.find(user => user.id === id)
}
export {
  User,
  Topic,
  Comment,
}
export default {
  users,
  topics,
  comments,
  getUser,
  getTopic,
  getComment,
}