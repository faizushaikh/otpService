const otpModel = require('../db/otpModel')
const bcrypt = require('bcrypt');

exports.sendOtp = async (req, res) => {
    try {
        let { mobile } = req.body;
        const generate_otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hasOtp = await bcrypt.hash(generate_otp, 10)
        let otp = await otpModel.findOne({ mobile: mobile }).sort({ updatedAt: -1 }).lean();
        if (otp && otp.mobile && otp.otpCount >= 5) {
            return res.json({
                success: false,
                message: "Otp limit exceeded try after 40 seconds",
            });

        } else {
            if (otp && otp.mobile && otp.otpCount <= 5) {
                let dataToStore = {
                    otpCount: otp.otpCount + 1,
                    otpValue: hasOtp,
                }
                await otpModel.findOneAndUpdate({ mobile: mobile }, dataToStore, { new: true });
            } else {
                let dataToStore = {
                    mobile: mobile,
                    otpValue: hasOtp,
                    otpCount: 1
                }

                otp_container = await otpModel(dataToStore).save();
            }

            return res.json({
                success: true,
                message: "Otp sent successfully",
            });

        }

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "OTP is not sent",
        });

    }
}

exports.verifyPehchaanOtp = async (req, res) => {
    try {

    } catch (error) {

        let message;



        if (error?.response?.data) {

            message = error.response.data.message;

        }

        return res.json({

            success: false,

            message: message || "Otp is not verified",

        });

    }

};
