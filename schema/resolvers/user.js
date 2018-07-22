const AuthService = require('../../services/auth')

module.exports = {
    User: {
        __resolveType(obj, context, info){
            if (obj.role === 'shipper') return 'Shipper';
            if (obj.role === 'carrier') return 'Carrier';
            return null;
        },
    },
    Query: {
        me: (root, args, { user, models }) => {
            if (!user) {
                throw 'Authentication Error';
            }
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