const mongoose = require("mongoose");



//pehchanotp schema

const OtpSchema = new mongoose.Schema(

 {
  mobile: { type: String ,index: true },

  otpValue: { type: String },

  otpCount: {type : Number},

  createdAt:{type:Date,default:Date.now,expires:86400}

  //createdAt:{type:Date,default:Date.now,expires:60}

 },

 {

  timestamps: true,

 }

);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 300 seconds = 5 minutes

module.exports = mongoose.model("otp", OtpSchema)


