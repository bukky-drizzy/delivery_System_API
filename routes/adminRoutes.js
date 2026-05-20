const protectedroute = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Example: Only Super Admin can access this
router.get('/dashboard', protectedroute, roleMiddleware('superadmin'), adminController.getDashboard);

// Example: Admin and Dispatcher can access this
router.get('/all-users', protectedroute, roleMiddleware('superadmin', 'dispatcher'), adminController.getAllUsers);

// Example: Any admin level can access
router.post('/approve-rider', protectedroute, roleMiddleware('superadmin', 'dispatcher', 'operations'), adminController.approveRider);