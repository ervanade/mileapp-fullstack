const request = require('supertest');
const app = require('../index');

describe('Auth', () => {
    it('login success', async () => {
        const res = await request(app).post('/api/login').send({ email: 'test@mile.app', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
    });

    it('login fail', async () => {
        const res = await request(app).post('/api/login').send({ email: 'wrong', password: 'wrong' });
        expect(res.statusCode).toEqual(401);
    });
});
