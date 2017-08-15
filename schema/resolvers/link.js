const
  base = process.cwd(),
  pubsub = require(`${base}/pubsub`);

function buildLinkFilters({
  OR = [],
  description_contains,
  url_contains,
}) {
  const filter = (description_contains || url_contains) ? {} : null;

  if (description_contains) {
    filter.description = {
      $regex: `.*${description_contains}.*`
    };
  }

  if (url_contains) {
    filter.url = {
      $regex: `.*${url_contains}.*`
    };
  }

  let filters = filter ? [filter] : [];
  for(let i = 0; i < OR.length; ++i) {
    filters = filters.concat(buildLinkFilters(OR[i]));
  }

  return filters;
}

module.exports = {
  Query: {
    getLinks: async (root, { filter, first, skip }, { mongo: { Links }}) => {
      let query = filter ? {
        $or: buildLinkFilters(filter)
      } : {};
      const cursor = Links.find(query);

      if (first) {
        cursor.limit(first)
      }

      if (skip) {
        cursor.skip(skip)
      }

      return await cursor.toArray();
    },
  },
  Mutation: {
    createLink: async (root, data, { mongo: { Links }, user }) => {
      const
        newLink = Object.assign({
          postedById: user && user._id,
        }, data),
        response = await Links.insert(newLink);

      newLink.id = response.insertedIds[0];
      
      pubsub.publish('Link', {
        Link: {
          mutation: 'CREATED',
          node: newLink,
        },
      });

      return newLink;
    },
  },
  Subscription: {
    Link: {
      subscribe: () => pubsub.asyncIterator('Link'),
    },
  },
  Link: {
    id: root => root._id || root.id,
    postedBy: async ({ postedById }, data, { dataloaders: { userLoader }}) => {
      return await userLoader.load(postedById);
    },
  },
}