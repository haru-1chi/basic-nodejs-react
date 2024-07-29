const express = require("express");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const profileRoutes = require("./profileRoutes");
const { errorHandler, notFoundHandler } = require("../middleware/errorHandler");
const rateLimit = require("express-rate-limit");
const app = express();

app.disable("x-powered-by");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: {
//     status: "error",
//     message: "Too many requests, please try again later.",
//   },
// });
// app.use(limiter);

app.get("/home", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to our API homepage!",
  });
});

app.use("/auth", authRoutes);
app.use("/user", profileRoutes);
app.use("/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
