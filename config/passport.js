const mongoose = require('mongoose');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { secret } = require('./');

const User = mongoose.model('User');

module.exports = passport => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;

    passport.use(
        new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({ _id: jwt_payload.id }, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};