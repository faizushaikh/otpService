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



module.exports = mongoose.model("otp", OtpSchema)


