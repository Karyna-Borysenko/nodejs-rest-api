const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

// Get All Contacts
const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// Get Contacts By ID
const getContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// Add Contact
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// Delete Contact
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status({ message: "Contact deleted" });
};

// Update Contact
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// Update Contact - Favorite
const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  if (!favorite) {
    return next(HttpError(400, "Missing field favorite"));
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
