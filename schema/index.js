const
  { makeExecutableSchema } = require('graphql-tools'),
  resolvers = require('./resolvers'),
  typeDefs = require('./types');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
