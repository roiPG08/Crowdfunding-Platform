const controller = require ('../controllers/projects');

const router = require('express').Router();


router.get("/project", controller.getProducts);
router.get('/project/:id', controller.getProductById);
router.patch('/project/:id', controller.editProduct);
router.delete('/project/:id', controller.deleteProject);

module.exports = router;