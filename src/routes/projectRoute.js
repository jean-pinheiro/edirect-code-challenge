const router = require('express').Router();
const projectController = require('../controllers/projectController');

router.get('/list/:userId', projectController.listProjects);
router.post('/add/:userId', projectController.addProject);

module.exports = router