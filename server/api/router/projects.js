const controller = require ('../controllers/projects');
const uploadMiddleware = require('./../../middleware/uploadMiddleware');
const router = require('express').Router();


router.get("/projects", controller.getProjectsList);
router.post("/project/new", uploadMiddleware, controller.addNewProject);
router.post("/project/:id/fund", controller.fundProject);
router.get('/project/:id', controller.getProductById);
router.patch('/update-project/:id', uploadMiddleware, controller.editProduct);
router.delete('/delete-project/:id', controller.deleteProject);
router.get("/:id/projects", controller.getUsersProjects);

module.exports = router;