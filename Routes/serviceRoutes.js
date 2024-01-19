const express = require("express");
const {
  addService,
  getAllServices,
  deleteServiceById,
  getLimitedServices,
} = require("../controllers/serviceController");
const router = express.Router();

router.post("/add-service", addService);

router.get("/get-limited-services", getLimitedServices);
router.get("/get-all-services", getAllServices);

router.delete("/deleteService/:id", deleteServiceById);

module.exports = router;
