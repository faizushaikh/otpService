const mongoose = require("mongoose");


const OtpSchema = new mongoose.Schema(
    {
        mobile: { type: String },
        otpValue: { type: String },
        otpCount: { type: Number }
    },
    {
        timestamps: true,
    }

);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 300 seconds = 5 minutes

module.exports = mongoose.model("otp", OtpSchema)


