const express = require("express");
const router = express.Router();

const applicationsController = require("../controllers/applications-list");
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

const authJwt = require('../middleware/authJwt');
const verifySignUp = require("../middleware/verifySignUp");

router.post('/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], authController.signup);
router.post('/auth/login', authController.signin);

router.get('/user', [authJwt.verifyToken], userController.getUsers);
router.delete('/user/:slid', [authJwt.verifyToken], userController.deleteUser);

router.get('/applications', applicationsController.getApplicationList);
router.post('/applications', applicationsController.addApplication);
router.delete('/applications/:id', applicationsController.deleteApplication);
router.put('/applications/:id', applicationsController.updateApplication);

module.exports = router;