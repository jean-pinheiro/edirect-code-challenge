const router = require('express').Router();
const projectController = require('../controllers/projectController');
const auth = require('../config/auth');

router.get('/list/:userId',  projectController.listProjects);
router.post('/add/:userId', auth.validateToken, projectController.addProject);
router.post('/delete/:projectId', auth.validateToken, projectController.deleteProject);

module.exports = router