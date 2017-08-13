const
  base = process.cwd(),
  path = require('path'),
  {
    fileLoader,
    mergeResolvers,
  } = require('merge-graphql-schemas'),
  resolvers = fileLoader(path.join(base, '/schema/resolvers'));

module.exports = mergeResolvers(resolvers);
