const { gql } = require('apollo-server-express');

module.exports = gql`
    enum Role {
        SHIPPER
        CARRIER
        ADMIN
    }

    type Query {
        users: [User]
    }

    type User {
        id: ID!
        email: String!
        password: String!
        role: Role!
    }

    type Shipper {
        id: ID!
        userId: ID!
        firstName: String!
        lastName: String!
    }

    type Carrier {
        userId: ID!
        companyName: String!
    }
`;