const Task = require('../db/indexes');

// GET /tasks
exports.index = async (req, res) => {
    const { q, status, priority, sort = 'due_date', limit = 10, page = 1 } = req.query;

    const query = {};
    if (q) query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
    ];
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? -1 : 1;

    const tasks = await Task.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Task.countDocuments(query);
    res.json({
        status: 'success',
        data: tasks,
        meta: {
            total,
            per_page: Number(limit),
            current_page: Number(page),
            last_page: Math.ceil(total / limit),
        },
    });
};

// POST /tasks
exports.store = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ status: 'success', data: task });
};

// PUT /tasks/:id
exports.update = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' });
    res.json({ status: 'success', data: task });
};

// DELETE /tasks/:id
exports.destroy = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' });
    res.json({ status: 'success', message: 'Task deleted successfully' });
};
