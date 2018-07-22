const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Carrier = User.discriminator(
    'carrier',
    new Schema({
        companyName: String,
        phone: String,
        website: String,
        country: String,
        city: String,
    }, {
        discriminatorKey: 'role'
    })
);

module.exports = Carrier;

