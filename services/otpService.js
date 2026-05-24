const Otp = require('../models/otp');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createOtp = async (userId) => {
  const otp = generateOtp();

  const otpRecord = await Otp.create({
    userId,
    otpCode: otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  return otpRecord;
};

const verifyOtp = async (userId, otpCode) => {
  const otpRecord = await Otp.findOne({
    userId,
    otpCode,
    isVerified: false,
  });

  if (!otpRecord) {
    throw new Error('Invalid OTP');
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new Error('OTP expired');
  }

  otpRecord.isVerified = true;
  await otpRecord.save();

  return otpRecord;
};

module.exports = {
  createOtp,
  verifyOtp,
};