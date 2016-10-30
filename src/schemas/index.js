import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: {
    name: {
      type: GraphQLString,
      resolve: () => {
        return "Arnupharp Viratanapanu"
      },
    },
    address: {
      type: GraphQLString,
      resolve: () => {
        return "Condominium"
      },
    }
  },
})

const RootQueryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    author: {
      type: PeopleType,
      resolve: () => {
        return {
          name: "xxx",
          address: "yyy",
        }
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

export default schema