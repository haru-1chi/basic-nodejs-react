const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const { Verify, VerifyRole } = require('../middleware/verify');
const app = express();

app.disable("x-powered-by"); // Reduce fingerprinting (optional)

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Specify the frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// Home route with the GET method and a handler
app.get("/home", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

app.get("/user", Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the your Dashboard!",
        user: req.user // Return user data
    });
});

app.get("/admin", Verify, VerifyRole, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the Admin portal!",
    });
});

// Use auth routes
app.use('/auth', authRoutes);

module.exports = app;
