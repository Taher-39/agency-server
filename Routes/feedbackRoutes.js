const express = require("express");
const router = express.Router();
const {
  postFeedback,
  getFeedback,
} = require("../Controllers/feedbackController");

router.post("/post-feedback/:id", postFeedback);

router.get("/getFeedback", getFeedback);

module.exports = router;
