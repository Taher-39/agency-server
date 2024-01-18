const express = require("express");
const {
  addService,
  getAllServices,
  deleteServiceById,
} = require("../Controllers/serviceController");
const router = express.Router();

// Route to add a new service
router.post("/add-service", addService);

// Route to get all services
router.get("/getAllServices", getAllServices);

// Route to delete a service by ID
router.delete("/deleteService/:id", deleteServiceById);

module.exports = router;
