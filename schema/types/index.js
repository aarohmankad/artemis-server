const
  base = process.cwd(),
  path = require('path'),
  {
    fileLoader,
    mergeTypes,
  } = require('merge-graphql-schemas'),
  types = fileLoader(path.join(base, '/schema/types'));

module.exports = mergeTypes(types);
