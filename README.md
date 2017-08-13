<!-- ![Logo of the project](./images/logo.sample.png) -->

# Artemis Server
> A GraphQL-enabled server seed

The Artemis Server is a server seed for many of my upcoming projects, it allows a developer to expose a GraphQL interface to the client, significantly improving server performance.

## Installing / Getting started

To get started with the Artemis Server:

```shell
git clone https://github.com/aarohmankad/artemis-server.git
mv artemis-server/ [project_name]/
cd [project_name]/
...
remove built in origin
add origin of your project
change names in package.json
update README.md
...
yarn start
```

## Developing

### Built With
`apollo-server-express`: GraphQL integration with `express`  
`bcrypt`: hashing and comparing user passwords  
`dataloader`: batching separate requests for same model type  
`jsonwebtoken`: assigning login tokens to users on sign in  
`merge-graphql-schemas`: allowing modularization of type definitions and resolvers  
`subscription-transport-ws`: enabling live updates between client/server through websockets.

### Prerequisites
[Node.js](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) (preferred)  
[Yarn](https://yarnpkg.com/en/) (preferred)  
[nodemon](https://nodemon.io/0) (for development)

### Contributing

```shell
git clone https://github.com/aarohmankad/artemis-server.git
cd artemis-server/
yarn install
nodemon
```

## Configurations

There *must* be a root-level `config/` folder.

As of now, the necessary files are:

`jwt.js`
```javascript
module.exports = {
  SECRET_KEY: "any sort of string here, try to make it difficult to crack",
  TESTING_TOKEN: "create and log a user in, use the token returned here",
};
```

`mongo.js`
```javascript
module.exports = {
  URL: "mongodb://localhost:27017/[project_name]",
};
```

## Licensing

This project is licensed under the [MIT License](LICENSE). The MIT License is:

A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.

For more information about the MIT License: [tl;drLegal](https://www.tldrlegal.com/l/mit)