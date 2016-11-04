import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import data from '../data'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    topic_id: { type: GraphQLInt },
    text: { type: GraphQLString },
    commentor_id: { type: GraphQLInt },
  }
})

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: (topic) => {
        return data.users.find((user) => {
          return user.id === topic.author_id
        })
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (topic) => {
        return data.comments.filter(comment => comment.topic_id == topic.id)
      }
    }
  },
})

const RootQueryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    topics: {
      type: new GraphQLList(TopicType),
      resolve: () => {
        return data.topics
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

export default schema