const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    dueDate: String
});

module.exports = mongoose.model('Task', taskSchema);
