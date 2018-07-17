const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    role: { 
        type: ['shipper', 'carrier', 'admin'] 

    },
}, { timestampes: true });

module.exports = mongoose.model('User', UserSchema);