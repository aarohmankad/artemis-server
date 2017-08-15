module.exports = {
  name: 'userLoader',
  loader: async ({ Users }, keys) => {
    return await Users.find({
      _id: {
        $in: keys,
      },
    }).toArray();
  },
  cacheKeyFn: key => key.toString(),
};
