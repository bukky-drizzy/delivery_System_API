const Dispatch = require('../models/dispatch');

// Create a new dispatch
const createDispatch = async (dispatchData) => {
    const dispatch = await Dispatch.create(dispatchData);

    return dispatch;
};


// Assign a rider to a dispatch
const assignRider = async (dispatchId, riderId) => {
    const dispatch = await Dispatch.findById(dispatchId);

    if (!dispatch) {
   throw new Error("Dispatch not found");
}

if (dispatch.deliveryStatus === "delivered") {
   throw new Error("Delivered dispatch cannot be reassigned");
}
dispatch.rider = riderId;

dispatch.deliveryStatus = "assigned";

dispatch.assignedAt = new Date();

await dispatch.save();

return dispatch;
};


// Update delivery status
const updateDeliveryStatus = async (dispatchId, status) => {
    const dispatch = await Dispatch.findById(dispatchId);

if (!dispatch) {
   throw new Error("Dispatch not found");
}
const allowedStatuses = [
   "pending",
   "assigned",
   "picked_up",
   "in_transit",
   "delivered",
   "cancelled",
];
if (!allowedStatuses.includes(status)) {
   throw new Error("Invalid delivery status");
}
dispatch.deliveryStatus = status;
if (status === "delivered") {
   dispatch.deliveredAt = new Date();
}
await dispatch.save();

return dispatch;
};


// Get all dispatches
const getAllDispatches = async () => {
    const dispatches = await Dispatch.find()
   .populate("customer")
   .populate("rider")
   .populate("order");

    return dispatches;
};


// Get dispatch by ID
const getDispatchById = async (dispatchId) => {
    const dispatch = await Dispatch.findById(dispatchId)
        .populate("customer")
        .populate("rider")
        .populate("order");

if (!dispatch) {
   throw new Error("Dispatch not found");
}

    return dispatch;
};


// Reassign rider to a dispatch (if needed)
const reassignRider = async (dispatchId, riderId) => {
    const dispatch = await Dispatch.findById(dispatchId);

if (!dispatch) {
   throw new Error("Dispatch not found");
}

if (dispatch.deliveryStatus === "delivered") {
   throw new Error("Delivered dispatch cannot be reassigned");
}

if (dispatch.rider?.toString() === riderId) {
   throw new Error("Rider already assigned to this dispatch");
}

dispatch.rider = riderId;

dispatch.deliveryStatus = "assigned";

dispatch.reassignedAt = new Date();

await dispatch.save();

return dispatch;

};


// Exporting the service functions
module.exports = {
   createDispatch,
   assignRider,
   updateDeliveryStatus,
   getAllDispatches,
   getDispatchById,
   reassignRider
};