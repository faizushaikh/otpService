const express = require('express')
const router = express.Router()
const { sendOtp } = require('../service/otpService')



router.post("/sendOtp",sendOtp)

router.post("/verifyOtp",sendOtp)

module.exports = router;

