const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');

const {protect, authorise} = require('../middlewares/authMiddleware');

router.post('/', protect, notificationController.createNotification);

router.get('/', protect, notificationController.getNotifications);

router.put(
  '/:id/read', protect, notificationController.markNotificationAsRead
);
module.exports = router;