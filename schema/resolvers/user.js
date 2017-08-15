const
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');
  
module.exports = {
  Mutation: {
    createUser: async (root, data, { mongo: { Users }}) => {
      const
        newUser = {
          name: data.name,
          email: data.authProvider.email.email,
          password: await bcrypt.hash(data.authProvider.email.password, 12),
        },
        response = await Users.insert(newUser);

      return Object.assign({
        id: response.insertedIds[0],
      }, newUser);
    },
    signinUser: async (root, data, { mongo: { Users }, SECRET_KEY }) => {
      const user = await Users.findOne({ email: data.email.email });
      if (!user) {
        return {
          success: false,
        };
      }

      const valid = await bcrypt.compare(data.email.password, user.password);
      if (valid) {
        const token = jwt.sign({
          _id: user._id,
        }, SECRET_KEY, {
          expiresIn: '100y',
        });

        return {
          success: true,
          token,
          user,
        }
      }
    },
  },
  User: {
    id: root => root._id || root.id,
  },
}