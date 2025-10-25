const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app'); // your Express app
const Task = require('../db/indexes'); // your Task model

let token;
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
    // Connect to MongoDB (use test DB or in-memory MongoDB)
    await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Generate a valid JWT token for auth
    token = jwt.sign({ id: 'user-1' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Task.deleteMany({});
});

describe('Task API', () => {
    const authHeader = { Authorization: `Bearer ${token}` };

    test('GET /api/tasks returns empty array initially', async () => {
        const res = await request(app).get('/api/tasks').set(authHeader);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.meta.total).toBe(0);
    });

    test('POST /api/tasks creates a task', async () => {
        const data = { title: 'New Task', description: 'desc', status: 'open', priority: 'high' };
        const res = await request(app).post('/api/tasks').set(authHeader).send(data);

        expect(res.statusCode).toBe(201);
        expect(res.body.data.title).toBe('New Task');
    });

    test('PUT /api/tasks/:id updates a task', async () => {
        const task = await Task.create({ title: 'Old', status: 'open' });

        const res = await request(app)
            .put(`/api/tasks/${task._id}`)
            .set(authHeader)
            .send({ title: 'Updated', status: 'done' });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe('Updated');
    });

    test('PUT /api/tasks/:id returns 404 if not found', async () => {
        const res = await request(app)
            .put(`/api/tasks/${new mongoose.Types.ObjectId()}`)
            .set(authHeader)
            .send({ title: 'Updated' });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Task not found');
    });

    test('DELETE /api/tasks/:id deletes a task', async () => {
        const task = await Task.create({ title: 'Delete Me' });

        const res = await request(app).delete(`/api/tasks/${task._id}`).set(authHeader);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Task deleted successfully');
    });

    test('DELETE /api/tasks/:id returns 404 if not found', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${new mongoose.Types.ObjectId()}`)
            .set(authHeader);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Task not found');
    });

    test('GET /api/tasks with filters works', async () => {
        await Task.create([
            { title: 'Task1', status: 'open', priority: 'high' },
            { title: 'Task2', status: 'done', priority: 'low' },
        ]);

        const res = await request(app).get('/api/tasks?status=open&priority=high').set(authHeader);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].title).toBe('Task1');
    });
});
