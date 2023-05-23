const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

// Get All Contacts
router.get("/", authenticate, ctrl.getListContacts);

// Get Contacts By ID
router.get("/:contactId", authenticate, isValidId, ctrl.getContact);

// Post Contact (Add)
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

// Delete Contact
router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

// Put Contact (Update)
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

// Patch Contact (Favorite)
router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
