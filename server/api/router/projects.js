const controller = require ('../controllers/projects');
const uploadMiddleware = require('./../../middleware/uploadMiddleware');
const router = require('express').Router();


router.get("/projects", controller.getProjectsList);
router.get("/project/:id/project-transactions", controller.getProjectTransactions);
router.get("/proof-of-reserve", controller.getPlatformBalance);
router.post("/project/new", uploadMiddleware, controller.addNewProject);
router.post("/project/:id/fund", controller.fundProject);
router.post("/project/collect-funds", controller.collectFunds);
router.post("/project/release-funds", controller.releaseFunds);
router.get('/project/:id', controller.getProjectById);
router.delete('/delete-project/:id', controller.deleteProject);
router.get("/:id/projects", controller.getUsersProjects);

module.exports = router;