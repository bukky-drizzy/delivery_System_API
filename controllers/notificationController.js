const notificationService = require('../services/notificationService');

const createNotification = async (req, res, next) => {
  try {
    const { userId, title, message } = req.body;

    const notification = await notificationService.createNotification(
      userId,
      title,
      message
    );

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.user.id
    );

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationAsRead,
};