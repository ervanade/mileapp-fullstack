const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["open", "on_progress", "done"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    due_date: { type: Date },
}, { timestamps: true });

// Indexes untuk query cepat
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ due_date: 1 });

module.exports = mongoose.model("Task", TaskSchema);
