const express = require('express')
const app = express()
const route = require('./router/otpRoute')
const db = require('./db/dbConnection')

db()
app.use(express.json());
app.use('/',route)
app.listen(3000,()=>{
    console.log('app started')
})