const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

   
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },

     password: {
      type: String,
      required: true,
      minlength: 6,
    },


    role: {
      type: String,
      enum: ["RIDER"],
      default: "RIDER",
    },

    vehicleType: {
      type: String,
      enum: ["BIKE", "CAR", "VAN"],
      default: "BIKE",
    },

    plateNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    availability: {
      type: String,
      enum: ["AVAILABLE", "BUSY", "OFFLINE"],
      default: "OFFLINE",
    },

   /*  deliveryStatus: {
      type: String,
      enum: [
        "IDLE",
        "PICKED_UP",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "IDLE",
    }, */

    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rider", riderSchema);