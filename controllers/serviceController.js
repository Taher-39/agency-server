const mongoose = require("mongoose");
const Service = require("../Models/serviceModel");

const addService = async (req, res) => {
  try {
    const { name, description, prices } = req.body;
    const defaultSubcategory = "Default Subcategory";
    const defaultPrice = 0;
    const defaultDuration = 1;

    const updatedPrices = prices?.map(({ subcategory, price, duration }) => ({
      subcategory: (subcategory ? subcategory.trim() : defaultSubcategory),
      price: price || defaultPrice,
      duration: duration || defaultDuration,
    }));

    const newService = new Service({
      name,
      description,
      prices: updatedPrices,
    });

    await newService.save();

    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add service" });
  }
};


const getLimitedServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 4;
    const skip = (page - 1) * perPage;

    const searchTerm = req.query.search || "";
    const regex = new RegExp(searchTerm, "i");

    const sortBy = req.query.sortBy || "uploadDate";
    const sortOrder = req.query.sortOrder || "desc";

    const totalServices = await Service.countDocuments({
      $or: [{ title: regex }, { description: regex }],
    });

    const totalPages = Math.ceil(totalServices / perPage);

    const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const services = await Service.find({
      $or: [{ title: regex }, { description: regex }],
    })
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    res.status(200).json({ services, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error getting services", error: error.message });
  }
};


const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Error getting services", error: error.message });
  }
};

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

module.exports = { addService, getAllServices, deleteServiceById, getLimitedServices };
