const express = require('express');
const { testConnection } = require('./db/conn');
const { authenticateJWT } = require('./middlewares/authMiddleware');

const app = express();
const PORT = 8080;

testConnection();
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});

app.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/users', userRoutes.modules);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});