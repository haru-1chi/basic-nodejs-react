// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/user-auth-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ errors: { message: 'Please fill all fields' } });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ errors: { email: 'Email is already taken' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
