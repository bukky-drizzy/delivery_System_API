const Notification = require('../models/notification');

const createNotification = async (userId, title, message) => {
  return await Notification.create({
    userId,
    title,
    message,
  });
};

const getUserNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
};