const controller = require ('../controllers/projects');

const router = require('express').Router();


router.get("/projects", controller.getProjectsList);
router.post("/project", controller.addNewProject);
router.get('/project/:id', controller.getProductById);
router.patch('/project/:id', controller.editProduct);
router.delete('/project/:id', controller.deleteProject);
router.get("/:id/projects", controller.getUsersProjects);

module.exports = router;