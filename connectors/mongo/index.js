const
  base = process.cwd(),
  { MongoClient } = require('mongodb'),
  { URL } = require(`${base}/config/mongo`);

module.exports = async () => {
  const db = await MongoClient.connect(URL);
  
  return {
    Users: db.collection('users'),
  };
}

