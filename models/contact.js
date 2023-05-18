const { Schema, model } = require("mongoose"); // Mongoose schema
const { handleMongooseError } = require("../helpers");

const Joi = require("joi"); // Joi schema

// Mongoose schema
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

// Joi Add schema
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(15).required(),
  favorite: Joi.boolean(),
});

// Joi Update schema
const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(9).max(15),
  favorite: Joi.boolean(),
});

// Joi schema for Favorite (for PATCH)
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

// There are usually a lot of schemes, so it’s better to combine everything at once
const schemas = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
