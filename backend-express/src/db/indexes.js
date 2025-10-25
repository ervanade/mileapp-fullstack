const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: String,
    status: { type: String, index: true },
    priority: { type: String, index: true },
    due_date: { type: Date, index: true },
}, { timestamps: true });

// Create compound index for filtering + sorting
taskSchema.index({ status: 1, priority: 1, due_date: -1 });

module.exports = mongoose.model('Task', taskSchema);
