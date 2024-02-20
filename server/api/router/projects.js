const controller = require ('../controllers/projects');

const router = require('express').Router();


router.get("/projects", controller.getProjectsList);
router.post("/project/new", controller.addNewProject);
router.get('/project/:id', controller.getProductById);
router.patch('/update-project/:id', controller.editProduct);
router.delete('/delete-project/:id', controller.deleteProject);
router.get("/:id/projects", controller.getUsersProjects);

module.exports = router;