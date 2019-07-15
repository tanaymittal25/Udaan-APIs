const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    workerID: String,
    workerName: String,
});

module.exports = mongoose.model('Worker', workerSchema);
