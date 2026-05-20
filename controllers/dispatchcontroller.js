const { 
    createDispatch, 
    assignRider,
    updateDeliveryStatus,
    getAllDispatches,
    getDispatchById,
    reassignRider,
} = require("../services/dispatchService");


// Create a new dispatch
const createDispatchController = async (req, res, next) => {
    try {
    const dispatchData = req.body;

    const dispatch = await createDispatch(dispatchData);

    res.status(201).json({
   success: true,
   message: "Dispatch created successfully",
   data: dispatch,
    });
 } catch (error) {
      next(error);
    }
};


// Assign a rider to a dispatch
const assignRiderController = async (req, res, next) => {
    try {
   const { dispatchId, riderId } = req.body;

   const dispatch = await assignRider(dispatchId, riderId);

   res.status(200).json({
      success: true,
      message: "Rider assigned successfully",
      data: dispatch,
   });
} catch (error) {
      next(error);
   }
};


// Update delivery status
const updateDeliveryStatusController = async (req, res, next) => {
    try {
   const { dispatchId, status } = req.body;

   const dispatch = await updateDeliveryStatus(dispatchId, status);

   res.status(200).json({
      success: true,
      message: "Delivery status updated successfully",
      data: dispatch,
   });
} catch (error) {
      next(error);
   }
};


// Get all dispatches
const getAllDispatchesController = async (req, res, next) => {
   try {
      const dispatches = await getAllDispatches();

      res.status(200).json({
         success: true,
         data: dispatches,
      });
   } catch (error) {
      next(error);
   }
};



// Get dispatch by ID
const getDispatchByIdController = async (req, res, next) => {
        try {
   const { id } = req.params;

   const dispatch = await getDispatchById(id);

   res.status(200).json({
      success: true,
      data: dispatch,
   });
} catch (error) {
      next(error);
   }
};


// Reassign rider to a dispatch (if needed)
const reassignRiderController = async (req, res, next) => {
   try {
      const { dispatchId, riderId } = req.body;

   const dispatch = await reassignRider(dispatchId, riderId);

      res.status(200).json({
         success: true,
         message: "Rider reassigned successfully",
         data: dispatch,
      });
   } catch (error) {
      next(error);
   }
};


// Exporting all controllers
module.exports = {
   createDispatchController,
    assignRiderController,
   updateDeliveryStatusController,
   getAllDispatchesController,
   getDispatchByIdController,
   reassignRiderController
};