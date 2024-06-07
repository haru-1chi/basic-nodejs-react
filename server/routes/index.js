const express = require('express'); // import the express module
const authRoutes = require('./authRoutes'); // import the auth routes
const app = express(); // Create an app object
const { Verify, VerifyRole } = require('../middleware/verify');
app.disable("x-powered-by"); // Reduce fingerprinting (optional)

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