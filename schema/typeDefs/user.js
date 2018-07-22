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

    interface User {
        id: ID
        email: String
        role: Role
    }

    type Shipper implements User {
        id: ID
        email: String
        role: Role
        firstName: String
        lastName: String
        phone: String
    }

    type Carrier implements User {
        id: ID
        email: String
        role: Role
        companyName: String
        phone: String
    }
`;