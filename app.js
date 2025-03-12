const express = require('express')
const app = express()
const route = require('./router/otpRoute')



app.use('/',route)
app.listen(3000,()=>{
    console.log('app started')
})