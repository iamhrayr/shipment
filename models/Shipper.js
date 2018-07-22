const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Shipper = User.discriminator(
    'shipper',
    new Schema({
        firstName: String,
        lastName: String,
        phone: String,
    }, {
        discriminatorKey: 'role'
    })
);

module.exports = Shipper;

