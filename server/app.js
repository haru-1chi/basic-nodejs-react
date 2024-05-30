const express = require('express')
const path = require('path')
const router = require('./routes/auth.js')
const app = express()

const basicAuth = require('express-basic-auth');

app.use(basicAuth({
    users: { 'admin' : 'password' } 
}));
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(8080,()=>{
    console.log("start server at port 8080")
})