const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    assetID: String,
    assetName: String,
});

module.exports = mongoose.model('Asset', assetSchema);
