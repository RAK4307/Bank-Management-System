const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/', controller.dashboard);
router.post('/deposit', controller.deposit);
router.post('/withdraw', controller.withdraw);

module.exports = router;