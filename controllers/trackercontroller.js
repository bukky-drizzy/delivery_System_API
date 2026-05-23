const Order = require("../models/order");


// PUBLIC TRACK ORDER
const trackOrder = async (req, res, next) => {
  try {

    const order = await Order.findOne({
      trackingId: req.params.trackingId,
    })
    .populate("rider", "fullName phone vehicleType");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Tracking ID not found",
      });
    }

    res.status(200).json({
      success: true,

      trackingData: {
        trackingId: order.trackingId,

        currentStatus: order.orderStatus,

        estimatedArrival:
          order.estimatedArrival,

        riderInfo: order.rider,

        deliveryTimeline:
          order.trackingTimeline,

        trackingLink:
          order.trackingLink,
      },
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  trackOrder,
};