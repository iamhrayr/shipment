const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    phone: String
});

module.exports = mongoose.model('Carrier', CarrierSchema);