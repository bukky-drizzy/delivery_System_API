const User = require("../models/user");

// Mocking Delivery model to prevent database errors since the Delivery schema doesn't exist
const Delivery = {
  countDocuments: async () => 0,
  find: () => ({
    populate: () => ({
      populate: async () => []
    })
  })
};

// One-time admin creation
exports.createFirstAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      return res.status(403).json({
        message: "Admin already exists. Access denied.",
      });
    }

    const { name, email, password } = req.body;

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "First admin created successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDeliveries = await Delivery.countDocuments();

    const pending = await Delivery.countDocuments({ status: "pending" });
    const assigned = await Delivery.countDocuments({ status: "assigned" });
    const picked = await Delivery.countDocuments({ status: "picked" });
    const delivered = await Delivery.countDocuments({ status: "delivered" });

    const riders = await User.countDocuments({ role: "rider" });
    const dispatchers = await User.countDocuments({ role: "dispatcher" });

    res.json({
      users: totalUsers,
      deliveries: totalDeliveries,
      statusBreakdown: {
        pending,
        assigned,
        picked,
        delivered,
      },
      riders,
      dispatchers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = role ? { role } : {};

    const users = await User.find(filter).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Getting deliveries with filters, you handling this dispatch should check and adjust to your entites in model
*/
exports.getDeliveriesWithFilter = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};

    const deliveries = await Delivery.find(filter)
      .populate("user", "name email")
      .populate("assignedRider", "name");

    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Missing getDeliveryStats implementation
exports.getDeliveryStats = async (req, res) => {
  try {
    res.json({
      total: 0,
      pending: 0,
      assigned: 0,
      picked: 0,
      delivered: 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};