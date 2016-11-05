import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
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
      type: connectionDefinitions({name: 'Comment', nodeType: CommentType}).connectionType,
      args: connectionArgs,
      resolve: (topic, args) => {
        return connectionFromArray(data.comments.filter(comment => comment.topic_id == topic.id), args)
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
      type: connectionDefinitions({name: 'Topic', nodeType: TopicType}).connectionType,
      args: connectionArgs,
      resolve: (_, args) => {
        return connectionFromArray(data.topics, args)
      }
    },
    users: {
      type: connectionDefinitions({name: 'User', nodeType: UserType}).connectionType,
      args: connectionArgs,
      resolve: (_, args) => {
        return connectionFromArray(data.users, args)
      }
    }
  },
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

export default schema