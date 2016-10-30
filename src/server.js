import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schemas'

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
app.listen(4000)
console.log('start graphql server at http://localhost:4000')