require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db/index');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger docs
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'MileApp API', version: '1.0.0' },
    },
    apis: ['./routes/*.js', './swagger/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api/documentations', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
