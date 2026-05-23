const axios = require("axios");
const Payment = require("../models/payment");
const initializePayment = async (req, res, next) => {
  try {

    const { email, amount, orderId } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data;
    console.log(data);

    // SAVE PAYMENT
    const payment = await Payment.create({
      orderId,
      customerEmail: email,
      amount,
      reference: data.reference,
      status: "PENDING",
    });

    res.status(200).json({
      success: true,
      authorization_url: data.authorization_url,
      reference: data.reference,
      payment,
    });

  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {

    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;
    console.log(paymentData);

    const payment = await Payment.findOne({
      reference,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (paymentData.status === "success") {
      payment.status = "SUCCESS";
      await payment.save();
    } else if(paymentData.status === "failed"){
      payment.status = "FAILED";
      await payment.save();
    }

    res.status(200).json({
      success: true,
      payment,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
};