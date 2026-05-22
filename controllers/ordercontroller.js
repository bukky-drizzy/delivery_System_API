const Order = require("../models/order");
const cloudinary = require("../configs/cloudinary");
const generateTrackingId = require("../utils/generateTrackingId");


// CREATE ORDER
const createOrder = async (req, res, next) => {
  try {

    const {
      customerName,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      packageDescription,
      deliveryType,
    } = req.body;

    // DELIVERY PRICING
    let deliveryPrice = 0;

    if (deliveryType === "BIKE") {
      deliveryPrice = 1000;
    }

    if (deliveryType === "CAR") {
      deliveryPrice = 3000;
    }

    if (deliveryType === "VAN") {
      deliveryPrice = 5000;
    }


    // CREATE ORDER
    const order = await Order.create({
      customerName,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      packageDescription,
      deliveryType,
      deliveryPrice,
      trackingId: generateTrackingId(),
    });

    const trackingLink = `${req.protocol}://${req.get("host")}/api/v1/track/${trackingId}`;
    order.trackingLink = trackingLink;

    await order.save();


    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const filter = {};

    // SEARCH BY TRACKING ID
    if (req.query.trackingId) {
      filter.trackingId = req.query.trackingId;
    }

    // FILTER BY STATUS
    if (req.query.status) {
      filter.orderStatus = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate("rider")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      page, 
      totalPages: Math.ceil(total / limit),
      totalOrders: total,
      data: orders,
    });

  } catch (error) {
    next(error);
  }
};


const getOrderHistory = async (req, res, next) => {
  try {

    const orders = await Order.find({
      businessOwner: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: order,
    });

  } catch (error) {
    next(error);
  }
};
const uploadProofOfDelivery = async (req,res,next) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.rider.toString() !== req.user.id) {
      return res.status(403).json({
      success: false,
      message: "You are not authorized to upload proof for this order",
     });
    }

    // UPLOAD TO CLOUDINARY
    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "proof_of_delivery",
        }
      );

    // SAVE TO DATABASE
    order.proofOfDelivery = {
      image: result.secure_url,

      deliveredAt: new Date(),
    };

    order.orderStatus = "DELIVERED";

    await order.save();

    res.status(200).json({
      success: true,

      message:
        "Proof of delivery uploaded",

      data: order,
    });

  } catch (error) {
    next(error);
  }
};

const uploadDamageReport = async (req,res,next) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.rider.toString() !== req.user.id) {
      return res.status(403).json({
      success: false,
      message: "You are not authorized to upload proof for this order",
     });
    }

    // CLOUDINARY UPLOAD
    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "damage_reports",
        }
      );

    // SAVE DAMAGE REPORT
    order.damageReport = {
      image: result.secure_url,

      reason: req.body.reason,

      reportedAt: new Date(),
    };

    await order.save();

    res.status(200).json({
      success: true,

      message:
        "Damage report uploaded",

      data: order,
    });

  } catch (error) {
    next(error);
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderHistory,
  uploadProofOfDelivery,
  uploadDamageReport
};
