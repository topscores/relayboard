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
        return data.authors[0]
      }
    }

  }
})

const RootQueryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, {id}) => {
        return data.authors.filter(author => (author.id === id))
      }
    },
    topics: {
      type: new GraphQLList(TopicType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, {id}) => {
        return data.topics.filter(topic => (topic.id === id))
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

export default schema