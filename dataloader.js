const DataLoader = require('dataloader');

async function batchUsers(Users, keys) {
  return await Users.find({
    _id: {
      $in: keys,
    },
  }).toArray();
}

module.exports = (mongo) => ({
  userLoader: new DataLoader(
    keys => batchUsers(mongo.Users, keys),
    {
      cacheKeyFn: key => key.toString()
    },
  ),
})
