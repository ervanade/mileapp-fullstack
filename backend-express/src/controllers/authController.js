const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mockUser = {
    id: 'user-1',
    email: 'test@mile.app',
    password: '$2b$10$V.yourbcryptpasswordhash', // hash of "password"
    name: 'Mile Mock User'
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (email !== mockUser.email) return res.status(401).json({ message: 'Invalid credentials' });

    const match = password === 'password'; // or bcrypt.compare(password, mockUser.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, token_type: 'bearer', expires_in: 3600, user: { id: mockUser.id, email: mockUser.email, name: mockUser.name } });
};
