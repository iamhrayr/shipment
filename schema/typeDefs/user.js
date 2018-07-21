const { gql } = require('apollo-server-express');

module.exports = gql`
    enum Role {
        shipper
        carrier
        admin
    }

    type Query {
        me: User
    }

    type Mutation {
        signup(email: String!, password: String!, role: Role!): User
        login(email: String!, password: String!): Auth
    }

    type Auth {
        token: String
    }

    type User {
        id: ID
        email: String
        role: Role
    }

    type Shipper {
        id: ID
        userId: ID
        firstName: String
        lastName: String
    }

    type Carrier {
        userId: ID
        companyName: String
    }
`;