const express = require("express");
const router = express.Router();
const {
  postFeedback,
  getFeedback,
} = require("../controllers/feedbackController");

router.post("/post-feedback/:id", postFeedback);

router.get("/getFeedback", getFeedback);

module.exports = router;
