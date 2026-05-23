const Rider = require("../models/rider");
const Order = require("../models/order");
const bcrypt = require("bcrypt");
const jwt = require("../configs/jwt");


// register rider
const registerRider = async (req, res, next) => {
try {
  const { fullName, phoneNumber, email, password, vehicleType, plateNumber } = req.body;

  if (!fullName || !phoneNumber || !email || !password || !vehicleType || !plateNumber) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  //check if rider already exists
  const existingRider = await Rider.findOne({$or: [{ email }, { phoneNumber }]});

  if (existingRider) {
    return res.status(400).json({
      success: false,
      message: "Rider already exists",
    });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  //create rider
  const rider = await Rider.create({
    fullName,
    phoneNumber,
    email,
    password: hashedPassword,
    vehicleType,
    plateNumber
  });

  //generate token
  const token = jwt.generateToken(rider);

  //send response
  res.status(201).json({
    success: true,
    token,
    data: {
      id: rider._id,
      fullName: rider.fullName,
      phoneNumber: rider.phoneNumber,
      email: rider.email,
      vehicleType: rider.vehicleType,
      role: rider.role,
      plateNumber: rider.plateNumber,
    }
  });
  } catch (error) {
    next(error);
  }
};

//login rider
const loginRider = async (req, res, next) => {
 try{
    const { email, password } = req.body;
    //find rider
    const rider = await Rider.findOne({ email });

    if (!rider) {
     return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, rider.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //generate token
    const token = jwt.generateToken(rider);
    //send response
    res.status(200).json({
      success: true,
      token,
      data: {
        id: rider._id,
        fullName: rider.fullName,
        phoneNumber: rider.phoneNumber,
        email: rider.email,
        role: rider.role,
        vehicleType: rider.vehicleType,
        plateNumber: rider.plateNumber,
      }

    });
  } catch (error) {
    next(error);
  }
};

// GET ALL ORDERS FOR A RIDER
const getRiderOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ rider: req.params.id }).populate(
      "rider"
    );

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};


// GET ALL RIDERS
const getAllRiders = async (req, res, next) => {
  try {
    const riders = await Rider.find();

    res.status(200).json({
      success: true,
      count: riders.length,
      data: riders,
    });
  } catch (error) {
    next(error);
  }
};


// GET SINGLE RIDER
const getSingleRider = async (req, res, next) => {
  try {
    const rider = await Rider.findById(req.params.id);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

// update rider information
const updateRider = async (req, res, next) => {
  try {
    const rider = await Rider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rider updated successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE RIDER AVAILABILITY
const updateAvailability = async (req, res, next) => {
  try {
    const rider = await Rider.findByIdAndUpdate(
      req.params.id,
      {
        availability: req.body.availability,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE LOCATION
const updateLocation = async (req, res, next) => {
  try {
    const rider = await Rider.findByIdAndUpdate(
      req.params.id,
      {
        currentLocation: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      },
      {
        new: true,
      }
    );

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location updated",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

//delete rider
const deleteRider = async (req, res,next) => {
  try {
    const rider = await Rider.findByIdAndDelete(req.params.id);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    };


    res.status(200).json({
      success: true,
      message: "Rider deleted successfully"
    });

  }
  catch (error){
    next(error);
  }
};

module.exports = {
  registerRider,
  loginRider,
  getAllRiders,
  getSingleRider,
  updateAvailability,
  updateLocation,
  updateRider,
  deleteRider
};