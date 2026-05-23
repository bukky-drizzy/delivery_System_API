const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');
const protectedroute = require('../middlewares/authMiddleware');

router.post('/', protectedroute, notificationController.createNotification);

router.get('/', protectedroute, notificationController.getNotifications);

router.put(
  '/:id/read',
  protectedroute,
  notificationController.markNotificationAsRead
);

module.exports = router;