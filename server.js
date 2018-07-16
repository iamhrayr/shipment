require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema'); 

// create express app
const app = express();

const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({
        // token: req.headers['auth-token'],
    }),
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
    console.log('Server started on the port', process.env.PORT);
});
