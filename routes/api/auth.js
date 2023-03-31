const express = require('express');

const { registerController } = require('../../controllers/authControllers/registrationControllers');
const { loginController } = require('../../controllers/authControllers/loginControllers');
const { logoutController } = require('../../controllers/authControllers/logoutControllers');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { currentController } = require('../../controllers/authControllers/currentControllers');
const { updateSubscriptionController } = require('../../controllers/authControllers/updateSubscription');
const { updateAvatarController } = require('../../controllers/authControllers/updateAvatar');
const { upload } = require('../../middlewares/upload');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', authMiddleware, logoutController);
router.post('/current', authMiddleware, currentController);
router.patch('/', authMiddleware, updateSubscriptionController);
router.patch('/avatars', authMiddleware, upload.single("avatar"), updateAvatarController);

module.exports = router;