const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Shipper', ShipperSchema);