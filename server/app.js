// const express = require('express')
// const path = require('path')
// const router = require('./routes/auth.js')
// const app = express()
// // const cors = require('cors')


// // app.use(express.urlencoded({extended:false}))
// // app.use(router)
// // app.use(express.static(path.join(__dirname,'public'))) //สำหรับ Route

// // app.use(cors())
// // app.use(express.json())

// // const db = mysql.createConnection(

// // )

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// })

// app.listen(8080,()=>{
//     console.log("start server at port 8080")
// })

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const roleMiddleware = require('./middleware/role');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express();

app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("Connected to the database!");
// }).catch(err => {
//   console.log("Cannot connect to the database!", err);
//   process.exit();
// });

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', authMiddleware, userRoutes);

// Role-protected route example
app.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.send('Admin access granted');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});