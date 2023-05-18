const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

// Get All Contacts
const getListContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

// Get Contacts By ID
const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// Add Contact
const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

// Delete Contact
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status({ message: "Contact deleted" });
};

// Update Contact
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
