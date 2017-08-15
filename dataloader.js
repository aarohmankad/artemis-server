const
  base = process.cwd(),
  fs = require('fs'),
  path = require('path'),
  DataLoader = require('dataloader');

module.exports = (mongo) => {
  const
    files = fs.readdirSync(`${base}/dataloaders`),
    loaders = {};

    files.map(file => {
      const dataloader = require(`${base}/dataloaders/${file}`);

      loaders[dataloader.name] = new DataLoader(
        keys => dataloader.loader(mongo, keys),
        {
          cacheKeyFn: dataloader.cacheKeyFn,
        },
      );
    });

  return loaders;
};
// ({
//   userLoader: new DataLoader(
//     keys => batchUsers(mongo.Users, keys),
//     {
//       cacheKeyFn: key => key.toString()
//     },
//   ),
// })
