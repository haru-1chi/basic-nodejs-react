const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { PORT, URI } = require('./config/index');
const appRoutes = require('./routes/index');
const dotenv = require('dotenv');
dotenv.config();
// === 1 - CREATE SERVER ===
const app = express();

// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
app.use(cors());
app.disable("x-powered-by"); // Reduce fingerprinting
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// === 2 - CONNECT DATABASE ===
// Set up mongoose's promise to global promise
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to app
app.use(appRoutes);

// === 5 - START UP SERVER ===
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
