const otpModel = require('../db/otpModel')
const bcrypt = require('bcrypt');

exports.sendOtp = async (req, res) => {
    try {
        let { mobile } = req.body;
       // const generate_otp = Math.floor(100000 + Math.random() * 900000).toString();
       const generate_otp = '123456'
        const hasOtp = await bcrypt.hash(generate_otp, 10)
        let otp = await otpModel.findOne({ mobile: mobile }).sort({ updatedAt: -1 }).lean();
        if (otp && otp.mobile && otp.otpCount >= 5) {
            return res.json({
                success: false,
                message: "Otp limit exceeded try after 5 minutes",
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

exports.verifyOtp = async (req, res) => {
    try {
        let { mobile, otp } = req.body
        let otp_value = await otpModel.findOne({ mobile: mobile }).sort({ updatedAt: -1 }).lean();
        let current_time = new Date();
        let timeDifference = current_time - otp_value.updatedAt
        const compareHash = await bcrypt.compare(otp, otp_value.otpValue)
        if (otp_value.mobile && compareHash) {
            if (timeDifference <= 300000) {
                await otpModel.deleteMany({ mobile: mobile });
                return res.status(200).json({
                    success: true, message: "OTP Verified Successfully"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "OTP Expired"
                })

            }

        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Otp"

            })
        }
    } catch (err) {
        throw err
    }

}
