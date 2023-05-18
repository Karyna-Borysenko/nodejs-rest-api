const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

// Get All Contacts
router.get("/", ctrl.getListContacts);

// Get Contacts By ID
router.get("/:contactId", ctrl.getContact);

// Post Contact (Add)
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// Delete Contact
router.delete("/:contactId", ctrl.deleteContact);

// Put Contact (Update)
router.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

module.exports = router;
