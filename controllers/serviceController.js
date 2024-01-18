const mongoose = require("mongoose");
const Service = require("../Models/serviceModel");

// Controller function to add a new service
const addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    const file = req.files.file;

    const encryptedImg = file.data.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encryptedImg, "base64"),
    };

    const newService = new Service({ title, description, image });
    // const newService = new Service({ title, description });
    await newService.save();

    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get services
const getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 4; // Adjust the number of services per page as needed
    const skip = (page - 1) * perPage;

    const searchTerm = req.query.search || "";
    const regex = new RegExp(searchTerm, "i");// Case-insensitive search

    const totalServices = await Service.countDocuments({
      $or: [{ title: regex }, { description: regex }],
    });

    const totalPages = Math.ceil(totalServices / perPage);

    const services = await Service.find({
      $or: [{ title: regex }, { description: regex }],
    })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({ services, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error getting services", error: error.message });
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
