const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

module.exports.authenticate = async ({ headers: { authorization }}, Users, SECRET_KEY) => {
  const { _id } = authorization && jwt.verify(authorization, SECRET_KEY);

  return _id && await Users.findOne({ _id:  ObjectID(_id) });
}
