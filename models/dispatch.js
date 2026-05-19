const mongoose = require('mongoose');
const dispatchSchema = new mongoose.Schema({
   trackingNumber: {
   type: String,
   required: true,
   unique: true
},

   order: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Order",
   required: true
},

   customer: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true
},

   rider: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Rider",
   default: null
},

   paymentStatus: {
   type: String,
   enum: ["pending", "paid", "failed"],
   default: "pending"
},

   deliveryStatus: {
   type: String,
   enum: [
      "pending",
      "assigned",
      "picked_up",
      "in_transit",
      "delivered",
      "cancelled"
   ],
   default: "pending"
},

  assignedAt: {
   type: Date,
   default: null
},

deliveredAt: {
   type: Date,
   default: null
},
},

{
  timestamps: true
}
);


const Dispatch = mongoose.model("Dispatch", dispatchSchema);

module.exports = Dispatch;