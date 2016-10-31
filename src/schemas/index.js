import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import data from '../data'

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
  },
})

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (topic) => {
        return data.authors.find((author) => {
          return author.id === topic.author_id
        })
      },
    },
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