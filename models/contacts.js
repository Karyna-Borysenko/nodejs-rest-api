const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

// All contacts
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// Contact By Id
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

// Remove Contact
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

// Add Contact
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// Update Contact
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

// Export
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
