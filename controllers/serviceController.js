const mongoose = require('mongoose');
const Service = require("../Models/serviceModel");

// Controller function to add a new service
const addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.files.file;

    const encryptedImg = file.data.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encryptedImg, "base64"),
    };

    const newService = new Service({ title, description, image });
    await newService.save();

    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding service", error: error.message });
  }
};

// Controller function to get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting services", error: error.message });
  }
};

// Controller function to delete a service by ID
const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const result = await Service.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Service deleted successfully" });
    } else {
      return res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = { addService, getAllServices, deleteServiceById };
