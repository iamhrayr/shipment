require('dotenv').config();
require('app-module-path').addPath(__dirname);

const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const models = require('./models');

// connect to the database
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, () => {
    console.log('connected to the db')
});

// create express app
const app = express();

// load passport configuration
require('./config/passport')(passport);

// express middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// authenticate each request coming from graphql
app.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        req.login(user, {session: false}, err => {
            if (err) return next(err);
            next();
        });
    })(req);
});

const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({
        models,
        user: req.user
    }),
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
    console.log('Server started on the port', process.env.PORT);
});
