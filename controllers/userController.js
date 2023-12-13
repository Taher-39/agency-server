const User = require("../Models/authModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAdminFeature = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isAdmin = req.body.isAdmin;
      await user.save();
      res.json({ message: "User isAdmin status updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  updateAdminFeature,
  getUserByEmail,
};
