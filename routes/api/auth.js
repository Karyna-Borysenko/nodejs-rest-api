const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register); // Register or signup

router.post("/login", validateBody(schemas.loginSchema), ctrl.login); // Login or signin

router.get("/current", authenticate, ctrl.getCurrent); // Current User

router.post("/logout", authenticate, ctrl.logout); // Logout

module.exports = router;
