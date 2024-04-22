const controller = require ('../controllers/users');

const router = require('express').Router();


router.get("/users/:id/projects", controller.getUsersProjects);
router.get("/user/:id", controller.getUserById);

module.exports = router;