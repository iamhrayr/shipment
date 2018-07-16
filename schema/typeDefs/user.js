const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        users: [User]
    }

    type User {
        id: ID!
        email: String!
        password: String!
    }
`;