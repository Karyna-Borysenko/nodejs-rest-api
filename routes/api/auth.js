const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// Register or signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Verification
router.get("/verify/:verificationToken", ctrl.verifyEmail);

// Re-verification
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

// Login or signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// Current User
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

// Update avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
