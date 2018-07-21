const AuthService = require('../../services/auth')
// const AuthService = require('services/auth')

module.exports = {
    Query: {
        me: (root, args, { user }) => {
            return user;
        },
    },
    Mutation: {
        signup: (root, { email, password, role }, { models }) => {
            return AuthService.signup({ email, password, role, models });
        },
        login: (root, { email, password }, { models }) => {
            return AuthService.login({ email, password, models });
        }
    }
}