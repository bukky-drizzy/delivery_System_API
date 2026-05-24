const otpService = require('../services/otpService');

const sendOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const otp = await otpService.createOtp(userId);

    res.status(201).json({
      success: true,
      message: 'OTP generated successfully',
      otp,
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { userId, otpCode } = req.body;

    const verified = await otpService.verifyOtp(userId, otpCode);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      verified,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};