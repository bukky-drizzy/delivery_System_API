/* const Order = require("../models/order");
const Rider = require("../models/rider");


// CREATE ORDER
const createOrder = async (req, res, next) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    next(error);
  }
};


// GET ALL ORDERS
const getAllOrders = async (req, res, next) => {
  try {

    const orders = await Order.find()
      .populate("rider");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    next(error);
  }
};


// GET SINGLE ORDER
const getSingleOrder = async (req, res, next) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("rider");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    next(error);
  }
};


// ASSIGN RIDER
const assignRider = async (req, res, next) => {
  try {

    const { riderId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // CHECK RIDER
    const rider = await Rider.findById(riderId);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    // CHECK AVAILABILITY
    if (rider.availability !== "AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Rider is not available",
      });
    }

    // ASSIGN RIDER
    order.rider = riderId;

    order.orderStatus = "ASSIGNED";

    await order.save();

    // UPDATE RIDER STATUS
    rider.availability = "BUSY";

    await rider.save();

    res.status(200).json({
      success: true,
      message: "Rider assigned successfully",
      data: order,
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res, next) => {
  try {

    const order = await Order.findById(req.params.id);

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
      message: "Order status updated",
      data: order,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  assignRider,
  updateOrderStatus,
}; */












const Order = require("../models/order");

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

/* const trackOrder = async (req, res, next) => {
  try {

    const order = await Order.findOne({
      trackingId: req.params.trackingId,
    }).populate("rider");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      trackingId: order.trackingId,
      status: order.orderStatus,
      rider: order.rider,
      data: order,
    });

  } catch (error) {
    next(error);
  }
}; */

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

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderHistory,
};
