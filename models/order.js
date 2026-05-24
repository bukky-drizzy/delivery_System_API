const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    packageDescription: {
      type: String,
      required: true,
    },

    deliveryType: {
      type: String,
      enum: ["BIKE", "CAR", "VAN"],
      default: "BIKE",
    },

    deliveryPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    trackingTimeline: [
      {
        status: String,
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    trackingLink: {
      type: String,
    },

    estimatedArrival: {
      type: String,
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "ASSIGNED",
        "PICKED_UP",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      default: null,
    },

    proofOfDelivery: {
      image: String,
      deliveredAt: Date,
    },

    damageReport: {
      image: String,
      reason: String,
      reportedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);