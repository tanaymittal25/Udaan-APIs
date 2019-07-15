const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskID: String,
    taskName: String,
    taskDur: String,
});

module.exports = mongoose.model('Task', taskSchema);
