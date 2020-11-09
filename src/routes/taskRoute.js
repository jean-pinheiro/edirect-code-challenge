const router = require('express').Router();
const taskController = require('../controllers/taskController');
const auth = require('../config/auth');

router.get('/list/:projectId', taskController.listTasks);
router.post('/add/:projectId', auth.validateToken, taskController.addTask);
router.post('/finish/:taskId', auth.validateToken, taskController.finishTask);
router.post('/delete/:taskId', auth.validateToken, taskController.deleteTask);

module.exports = router