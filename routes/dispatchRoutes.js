const router = require("express").Router(); // Importing controllers

const {createDispatchController,
       assignRiderController,
       updateDeliveryStatusController,
       getAllDispatchesController,
       getDispatchByIdController,
       reassignRiderController
 } = require("../controllers/dispatchcontroller");

// Create a new dispatch
router.post("/dispatch", createDispatchController);

// Assign a rider to a dispatch
router.patch("/dispatch/assign-rider", assignRiderController);

// Reassign rider to a dispatch
router.patch(
   "/dispatch/reassign-rider",
   reassignRiderController
);

// Update delivery status
router.patch("/dispatch/update-status",
    updateDeliveryStatusController
);

// Get all dispatches
router.get("/dispatch", getAllDispatchesController);

// Get dispatch by ID
router.get("/dispatch/:id", getDispatchByIdController);


module.exports = router; // Exporting the router to be used in server.js 