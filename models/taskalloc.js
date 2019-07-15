const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskAllocSchema = new Schema({
    assetId: String,
    taskId: String,
    workerId: String,
    timeOfAllocation: Date,
    taskToBePerformedBy: Date,
});

module.exports = mongoose.model('TaskAlloc', taskAllocSchema);
