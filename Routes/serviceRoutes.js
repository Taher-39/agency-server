const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Route to add a new service
router.post("/addService", serviceController.addService);

// Route to get all services
router.get("/getAllServices", serviceController.getAllServices);

// Route to delete a service by ID
router.delete("/deleteService/:id", serviceController.deleteServiceById);

module.exports = router;
