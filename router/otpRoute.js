const express = require('express')
const router = express.Router()




router.get("/sendOtp",(req,res)=>{
    res.status(200).json({
        message:"hello"
    })
})


module.exports = router;

