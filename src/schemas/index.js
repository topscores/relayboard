import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay'

import {User, Topic, Comment} from '../data'
import data from '../data'

const {nodeField, nodeInterface} = nodeDefinitions((globalId) => {
  const {type, id} = fromGlobalId(globalId)
  if (type == 'User') {
    return data.getUser(id)
  }
  else if (type == 'Topic') {
    return data.getTopic(id)
  }
  else if (type == 'Comment') {
    return data.getComment(id)
  }
  return null
})

const UserType = new GraphQLObjectType({
  name: 'User',
  isTypeOf: function(obj) {
    return obj instanceof User
  },
  fields: {
    id: globalIdField('User'),
    name: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  isTypeOf: function(obj) {
    return obj instanceof Comment
  },
  fields: {
    id: globalIdField('Comment'),
    topic_id: { type: GraphQLInt },
    text: { type: GraphQLString },
    commentor_id: { type: GraphQLInt },
  },
  interfaces: [nodeInterface],
})

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  isTypeOf: function(obj) {
    return obj instanceof Topic
  },
  fields: {
    id: globalIdField('Topic'),
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
  interfaces: [nodeInterface],
})

const RootQueryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    node: nodeField,
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