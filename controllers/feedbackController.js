const Feedback = require("../Models/feedbackModel");
const { hasUserOrdered } = require("./orderController");

const postFeedback = async (req, res) => {
  try {
    const { company, comment, rating, email } = req.body;
    const userId = req.params.id;

    const userHasOrdered = await hasUserOrdered(email);

    if (userHasOrdered) {
      const newFeedback = new Feedback({
        user: userId,
        company,
        comment,
        rating,
      });

      await newFeedback.save();

      res
        .status(201)
        .json({
          message: "Feedback posted successfully",
          feedback: newFeedback,
        });
    } else {
      res
        .status(400)
        .json({ message: "User has no orders. Cannot post feedback." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to post feedback" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const reviews = await Feedback.find({}).populate("user", "name");

    const feedbackData = reviews.map((feedback) => ({
      name: feedback.user.name,
      company: feedback.company,
      comment: feedback.comment,
      rating: feedback.rating,
    }));

    res.status(200).json({ feedbackData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { postFeedback, getFeedback };
