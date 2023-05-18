const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

// Get All Contacts
router.get("/", ctrl.getListContacts);

// Get Contacts By ID
router.get("/:contactId", isValidId, ctrl.getContact);

// Post Contact (Add)
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// Delete Contact
router.delete("/:contactId", isValidId, ctrl.deleteContact);

// Put Contact (Update)
router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

// Patch Contact (Favorite)
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
