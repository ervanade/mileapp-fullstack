const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.use(auth); // Protect all task routes

router.get('/', taskController.index);
router.post('/', taskController.store);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.destroy);

module.exports = router;
