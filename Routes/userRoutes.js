const express = require("express");
const {
  getAllUsers,
  updateAdminFeature,
  getUserByEmail,
} = require("../controllers/userController");

const router = express.Router();

router.get("/all-users", getAllUsers);
router.get("/get-user-by-email", getUserByEmail);
router.patch("/update-user-role/:id", updateAdminFeature);

module.exports = router;
