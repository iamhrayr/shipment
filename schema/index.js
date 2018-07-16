const path = require('path');
const { makeExecutableSchema, gql } = require('apollo-server-express');
const { fileLoader, mergeResolvers,mergeTypes } = require('merge-graphql-schemas');

// merge types
const typesArray = fileLoader(path.join(__dirname, './typeDefs'));
const typeDefs = mergeTypes(typesArray);

// merge resolvers
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;