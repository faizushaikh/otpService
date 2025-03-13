const express = require('express')
const router = express.Router()
const { sendOtp ,verifyOtp } = require('../service/otpService')
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');
const redis = require('redis')

const redisClient = new Redis({
    host: 'localhost',  // Change this to your Redis server's host
    port: 6379,         // Redis default port
  });
  
  // Set up rate limiter with Redis as store
  const limiter = rateLimit({
    store: new RedisStore({
      client: redisClient,
      expiry: 60 * 15, // Store data for 15 minutes
    }),
    windowMs: 60 * 1000, // 1 minute in milliseconds
    max: 7,  // Limit each IP to 7 requests per minute
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  
router.post("/sendOtp",limiter,sendOtp)

router.post("/verifyOtp",verifyOtp)

module.exports = router;

