const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.post('/add/:projectId', taskController.addTask);
router.get('/list/:projectId', taskController.listTasks);
router.post('/finish/:taskId', taskController.finishTask);
router.post('/delete/:taskId', taskController.deleteTask);

module.exports = router