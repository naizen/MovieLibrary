require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const MovieAPI = require('./datasources/movie');

const dataSources = () => ({
  movieAPI: new MovieAPI()
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

exports.handler = server.createHandler();
